import TwilioBusinessDatabase from "@/app/models/TwilioBusinessDatabase";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const twilioNumber = new URLSearchParams(request.url.split("?")[1]).get("Twilio_Number");

    if (!twilioNumber) {
        return NextResponse.json({
            record: await TwilioBusinessDatabase._scan()
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
        record
    });
}

