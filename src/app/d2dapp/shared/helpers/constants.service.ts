
import {Injectable} from "@angular/core";

@Injectable()

export class ConstantsService {

     transferProtocol: string = "http://"

     serverUrl: string = this.transferProtocol + "d2d-demo.herokuapp.com";

     defaultInputBackColor: string = 'white';
     onFocusInputBackColor: string = '#efffea';

     redirectAfterSignup: string = "/security/auth/signin";
     redirectAfterSignin: string = "/"

     dropdown_UserComponentOrderDir: number = 1
     dropdown_UserComponentOrderBy: number = 2
     dropdown_UserComponentOrderBy_DefaultItemId: number = 15
     dropdown_UserComponentOrderDir_DefaultItemId: number = 16

     dropdown_UserComponentLanguage_DefaultId: number = 1
     dropdown_UserComponentProfile_DefaultId: number = 1

}