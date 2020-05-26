import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const header = req.headers["x-ms-client-principal"];
    const encoded = Buffer.from(header, "base64");
    const decoded = encoded.toString("ascii");
    const user = JSON.parse(decoded);
    const name = (req.query.name || (req.body && req.body.name)) ?? 'Fallback Name';

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: `Hello ${name} (${user?.userDetails ?? 'anonymous'})`
    };
};

export default httpTrigger;
