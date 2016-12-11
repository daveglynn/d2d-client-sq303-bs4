import { Injectable } from '@angular/core';
import { ConstantsService } from   '../../shared/helpers/constants.service';

import * as _ from 'underscore';

@Injectable()
export class UserCode {

    /***************************************************************************************
     Construtor section
    ***************************************************************************************/
    constructor(
        private _cs: ConstantsService
    )
    { }

    //validation
    validate(validate: string[]  ) {

        if (validate['selectedItem'] === "") {
            return 1000
        }


    }


}

