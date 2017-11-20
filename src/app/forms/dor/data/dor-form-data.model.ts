import { CategoryRating } from './categoryRating.model';
import { DorCategoryFormComponent } from './../dor-category-form/dor-category-form.component';
import { CannedComment } from './CannedComment.model';
import { AppUser } from './../../../core/data-models/app-user.model';
import { DORRating } from './../../../core/data-models/dor-rating.model';
export class FormData {
    public recruit: AppUser = new AppUser('', '', '', '', '', '', null, null);
    public fto: AppUser = new AppUser('', '', '', '', '', '', null, null);
    public phase = '';
    public dorNumber: number;
    public shiftDate: Date = new Date();
    public finalized: boolean;
    public reviewed: boolean;
    public shiftWorked = '';
    public districtWorked = '';
    public primaryCalls = 0;
    public backupCalls = 0;
    public selfInitCalls = 0;
    public arrestsMade = 0;
    public dorRatings: CategoryRating[] = [
        new CategoryRating(0, 0, 0, '')
    ];
    public dorComments: CannedComment[] = [];

    // constructor(recruit: AppUser,
    //             fto: AppUser,
    //             phase: string,
    //             shiftDate: string,
    //             shiftWorked: string,
    //             districtWorked: string,
    //             primaryCalls: number,
    //             backupCalls: number,
    //             selfInitCalls: number,
    //             arrestsMade: number,
    //             dorRatings: DORRating[],
    //             dorComments: DORComment[]) {
    //                 this.recruit = recruit;
    //                 this.fto = fto;
    //                 this.shiftDate = shiftDate;
    //                 this.shiftWorked = shiftWorked;
    //                 this.districtWorked = districtWorked;
    //                 this.primaryCalls = primaryCalls;
    //                 this.backupCalls = backupCalls;
    //                 this.selfInitCalls = selfInitCalls;
    //                 this.arrestsMade = arrestsMade;
    //                 this.dorComments = dorComments;
    //                 this.dorRatings = dorRatings;
    //             }

    clear() {
        this.recruit = null;
        this.fto = null;
        this.phase = '';
        this.shiftDate = null;
        this.shiftWorked = '';
        this.districtWorked = '';
        this.dorNumber = null;
        this.primaryCalls = null;
        this.backupCalls = null;
        this.selfInitCalls = null;
        this.arrestsMade = null;
        this.dorRatings = null;
        this.dorComments = null;
        this.finalized = null;
        this.reviewed = null;
    }
}


