export class Comment {
  
    id: number;
    description: string = "";
    commentable_type: string = "";
    commentable_id: number;
    date: Date;
    created_at: Date;
    updated_at: Date;
    user_id: number;
    errors: any[];

    constructor(values: any) {
        Object.assign(this, values);
        if(values.date) { this.date = new Date(values.date); }
        if(values.created_at) { this.created_at = new Date(values.created_at); }
        if(values.updated_at){ this.updated_at = new Date(values.updated_at); }
    }
}