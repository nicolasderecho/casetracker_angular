export class Case {
  
    id: number;
    title: string = "";
    expedient: string = "";
    judge: string = "";
    date: Date;
    status: string = "";
    created_at: Date;
    updated_at: Date;
    user_id: number;
    errors: any[];

    currentStatus() :string {
        let translatedStatuses = { 
                designation: 'Designación',
                removed_citation: 'Citación removida',
                in_test: 'En prueba',
                in_judgment: 'En juicio',
                waiting_payment: 'Por cobrar'
        };
        return translatedStatuses[this.status] || '';
    }

    constructor(values: any) {
        Object.assign(this, values);
        this.date = new Date(values.date);
        this.created_at = new Date(values.created_at);
        this.updated_at = new Date(values.updated_at);
    }
}