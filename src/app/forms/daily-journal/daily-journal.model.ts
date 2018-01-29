export class DailyJournal {
    public id: number;
    public singleMost: string;
    public applyKnowledge: string;
    public areaProud: string;
    public improveMost: string;
    public leastSatisfied: string;
    public questions: string;
    public modified: Date;

    clear() {
        this.id = null;
        this.singleMost = '';
        this.applyKnowledge = '';
        this.areaProud = '';
        this.improveMost = '';
        this.leastSatisfied = '';
        this.questions = '';
        this.modified = null;
    }
}
