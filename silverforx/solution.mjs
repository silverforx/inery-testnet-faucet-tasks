import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
const url = "http://134.209.189.99:8888"

const json_rpc = new JsonRpc(url)
const private_key = process.env.PRIVATE_KEY;

const account = "silverforx"
const actor = process.env.INERY_ACCOUNT
const signature  = new JsSignatureProvider([private_key]);

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function create(tanda, klaien, kleintdata){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"create",
                    authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        tanda, klaien, kleintdata
                    }
                }
            ]
        },{broadcast:true,sign:true})

        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
        console.log("===================== CREATE trx details ======================")
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}


async function read(tanda){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"read",
                    authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        tanda
                    }
                }
            ]
        },{broadcast:true,sign:true})
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
        console.log("===================== READ trx details ========================")
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function update(tanda, kleintdata){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"update",
                    authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        tanda, kleintdata
                    }
                }
            ]
        },{broadcast:true,sign:true})

        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
        console.log("================== UPDATE transaction details =================")
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function destroy(tanda){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"destroy",
                    authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        tanda
                    }
                }
            ]
        },{broadcast:true,sign:true})

        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
        console.log("================= DESTROY transaction details =================")
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}


async function main(tanda, klaien, kleintdata){
    await create(tanda, klaien, kleintdata)
    await read(tanda)
    await update(tanda, kleintdata)
    await destroy(tanda)
}

main(1, account, "CRUD Smartcontract transaction via JSON RPC")