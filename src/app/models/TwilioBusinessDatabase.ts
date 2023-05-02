import {dynamoDb, table} from "@/app/models/aws";

export interface TwilioBusinessDatabaseType {
    TwilioNumber: string,
    BusinessNumber: string,
    url: string
}
export default class TwilioBusinessDatabase {
    record: TwilioBusinessDatabaseType

    constructor(entry: TwilioBusinessDatabaseType) {
        this.record = entry;
    }

    static async get(twilioNumber: string): Promise<null | TwilioBusinessDatabase> {
        const result = await dynamoDb.get({
            TableName: table,
            Key: {
                Twilio_Number: twilioNumber
            }
        }).promise();
        if (!result.Item) {
            return null;
        }
        return new TwilioBusinessDatabase(result.Item as TwilioBusinessDatabaseType);
    }

    static async _put(record: TwilioBusinessDatabaseType) {
        await dynamoDb.put({
            TableName: table,
            Item: record
        }).promise();
    }

    async create() {
        if (!!await TwilioBusinessDatabase.get(this.record.TwilioNumber)) {
            throw new Error("Record Already Exists!");
        }
        await TwilioBusinessDatabase._put(this.record);
    }

    static async _scan(){
        return await dynamoDb.scan({
            TableName: table,
        }).promise();
    }

    async put(record: TwilioBusinessDatabaseType) {
        if (!await TwilioBusinessDatabase.get(this.record.TwilioNumber)) {
            throw new Error("Record Does Not Exist!");
        }
        await TwilioBusinessDatabase._put({
            ...this.record,
            ...record
        });
    }
    static async _delete(TwilioNumber: string) {
        await dynamoDb.delete({
            TableName: table,
            Key: {
                Twilio_Number: TwilioNumber
            }
        }).promise();
    }

    async delete() {
        await TwilioBusinessDatabase._delete(this.record.TwilioNumber);
    }
}