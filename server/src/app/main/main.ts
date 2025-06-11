import { config } from 'dotenv';
import { OBJECTNAME, Users } from '../services/firebase.service';
import { StoreDbService } from '../services/firebase.service'; // <== your updated store
import { UtilsService } from '../services/utils.service';
import { WebServerComponent } from '../components/webServer.component';
import { StripeService } from '../services/stripeAdn';
import { getAuth } from 'firebase-admin/auth';

config(); // Load .env file

export class MainComponent {
    private backendFbObjects = [
        OBJECTNAME.wnUsers,
        OBJECTNAME.wnLocations,
        OBJECTNAME.wnBookings,
    ];

    private utilSvc = new UtilsService();
    private storeDbSvc = new StoreDbService(this.utilSvc);
    private stripeSvc = new StripeService();
    private webServerComponent = new WebServerComponent(this.utilSvc, this.stripeSvc);

    public version: string;

    constructor() {
        this.utilSvc.getParams();
        this.initBackend();
    }

    public async initBackend(platform?: string, backendFbObjects = this.backendFbObjects): Promise<void> {
        try {
            const configData = await this.utilSvc.readConfig("/dist2/config/adf.json", platform || this.utilSvc.platformEnv);
            this.utilSvc.config = configData;

            this.webServerComponent.initWebServer(); // Start Express server

            this.storeDbSvc.initFirebase();

            if (this.utilSvc.config.application?.release) {
                this.version = this.utilSvc.config.application.release;
            }

            const temp=await this.storeDbSvc.getObject(OBJECTNAME.wnUsers);
            const temptemp = this.utilSvc.objectToArray(temp);
            let tt = temptemp[0] as Users;
            tt.stripeAccountId = 'yoyuoyu';
            const temp1=await this.storeDbSvc.setObject(OBJECTNAME.wnUsers+'/totototototo', tt);


/*            // Subscribe to backend objects
            const subscribePromises = backendFbObjects.map(fbObject => {
                const path = `${this.utilSvc.backendFBstoreId}/${fbObject}`;
                return this.storeDbSvc.subscribe(path, fbObject);
            });

            await Promise.all(subscribePromises);

            console.log('Backend initialized successfully.');

            this.listAuthUsers();*/
        } catch (error) {
            console.error('Error during backend initialization:', error);
            throw error;
        }
    }


    async cleanUpUsers() {
        let token = '';
        const listAllUsers = (nextPageToken) => {
            let wnUser: Users;
            // List batch of users, 1000 at a time.
            this.utilSvc.firebaseAdmin
                .auth()
                .listUsers(1000, nextPageToken)
                .then(async (listUsersResult) => {
                    console.log('listUsersResult=', listUsersResult);
                })
                .catch((error) => {
                    console.log('Error listing users:', error);
                });
        };
    }

    async listAuthUsers(nextPageToken?: string) {
        const auth = getAuth();
      
        try {
          const listUsersResult = await auth.listUsers(1000, nextPageToken);
          
          listUsersResult.users.forEach(userRecord => {
            console.log('User:', userRecord.toJSON());
          });
      
          if (listUsersResult.pageToken) {
            // If there are more users, recursively list them
            await this.listAuthUsers(listUsersResult.pageToken);
          }
        } catch (error) {
          console.error('Error listing Firebase Auth users:', error);
        }
      }
}
