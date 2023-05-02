import {NextResponse} from "next/server";
import TwilioBusinessDatabase from "@/app/models/TwilioBusinessDatabase";

export async function GET(request: Request){
    const twilioNumber = new URLSearchParams(request.url.split("?")[1]).get("Twilio_Number");
    if (!twilioNumber) {
        return NextResponse.json({
            error: "Invalid API Call. Twilio_Number Not Provided!"
        }, {
            status: 404
        });
    }
    const record = await TwilioBusinessDatabase.get(twilioNumber as string);
    if (!record) {
        return NextResponse.json({
            error: "Not Found"
        }, {
            status: 404
        });
    }
    return NextResponse.json({
        Business_Number: record.record.BusinessNumber
    });

}