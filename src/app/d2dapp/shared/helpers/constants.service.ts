
import {Injectable} from "@angular/core";
import { DropDownItem } from "./../../master/items/item";

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
 
     dropdown_UserComponentOrderBy_Default = JSON.parse('{"id":1,"parentListId":0,"name":"Email","code":"email","ruleBookId":1}')
     dropdown_UserComponentOrderDir_Default = JSON.parse('{"id":16,"parentListId":0,"name":"ASC","code":"ASC","ruleBookId":1}')
     dropdown_UserComponentLanguage_Default = JSON.parse('{"id":2,"parentListId":0,"name":"French","code":"FRE","ruleBookId":0}')
     dropdown_UserComponentProfile_Default = JSON.parse('{"id":1,"parentListId":0,"name":"Demo Profile 1","code":"NA","ruleBookId":0}')
 
 
}