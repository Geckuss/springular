import { FormControl, ValidationErrors } from "@angular/forms";

export class Validators {

    static notOnlyWhitespace(control: FormControl) : ValidationErrors {
        if ((control.value != null) && (control.value.trim().length === 0)) {
            return { 'notOnlyWhitespace': true };
        }
        else {
            return { 'notOnlyWhitespace': false };
        }
    }

}
