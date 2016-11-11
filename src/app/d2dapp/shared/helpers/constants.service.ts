
import {Injectable} from "@angular/core";

@Injectable()

export class ConstantsService {

     transferProtocol: string = "http://"

     serverUrl: string = this.transferProtocol + "d2d-demo.herokuapp.com";

     defaultInputBackColor: string = 'white';
     onFocusInputBackColor: string = '#efffea';

     redirectAfterSignup: string = "/security/auth/signin";
     redirectAfterSignin: string = "/"

     listId_DirectionAscDesc: number = 1
     listId_UserOrderDropDown: number = 2
     listId_UserOrderDropDown_DefaultItemId: number = 15
     listId_DirectionAscDesc_DefaultItemId: number = 16


}