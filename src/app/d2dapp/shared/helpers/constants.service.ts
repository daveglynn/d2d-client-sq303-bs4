
import {Injectable} from "@angular/core";

@Injectable()

export class ConstantsService {

     transferProtocol: string = "http://"

     serverUrl: string = this.transferProtocol + "d2d-demo.herokuapp.com";

     defaultInputBackColor: string = 'white';
     onFocusInputBackColor: string = '#efffea';

     redirectAfterSignup: string = "/security/auth/signin";
     redirectAfterSignin: string = "/"

}