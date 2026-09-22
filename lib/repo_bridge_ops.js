const { array } = require("mikado")

/*

−32000 to −32099	Server error	Reserved for implementation-defined server errors
{"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null}
{"jsonrpc": "2.0", "error": {"code": -32601, "message": "Method not found"}, "id": 2},
{"jsonrpc": "2.0", "error": {"code": -32602, "message": "Invalid params", "data": "Missing required parameter: subtrahend"}, "id": 2}
{"jsonrpc": "2.0", "error": {"code": -32603, "message": "Internal error"}, "id": 4}
{"jsonrpc": "2.0", "error": {"code": -32700, "message": "Parse error"}, "id": null}

// Maybe schemas ...    https://json-rpc.dev/docs

https://github.com/modelcontextprotocol/modelcontextprotocol/tree/main/schema/2026-07-28
https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro

*/
class Attachment {
    constructor(id,title,data) {
        this.id = id
        this.title = title
        this.data = data
    }
}


/* 
"get-mail"
"store-mail"
"remove-mail"
"send-mail"
"store-draft"
"get-contacts"
"store-contact"
"remove-contact"
*/


class LocalCacheStorage {
    constructor() {
        this.all_storage_classes = {
            'inbox' : {},
            'sent' : {},
            'drafts' : {},
            'spam' : {},
            'notify' : {},
            'trash' : {},
            'contacts' : {}
        }
    }

    mail_classes() {
        return ['inbox','sent','drafts','spam','notify','trash', 'contacts']
    }

    /**
     * 
     * @param {array} mail_list 
     */
    store_mails(mtype,mail_list) {
        let mail_set = this.all_storage_classes[mtype]
        if ( mail_set ) {
            for ( let m of mail_list ) {
                mail_set[m.id] = structuredClone(m)
            }
        }
    }



    /**
     * 
     * @param {object} contact_object 
     */
    remove_mails(mtype,mail_id_list) {
        let mail_set = this.all_storage_classes[mtype]
        if ( mail_set ) {
            for ( let id of mail_id_list ) {
                delete mail_set[id]
            }
        }
    }



    get_emails(mtype) {
        let mail_set = this.all_storage_classes[mtype]
        return Object.values(mail_set)
    }



    /**
     * 
     * @param {object} contact_list 
     */
    store_contacts(contact_list) {
        let contact_set = this.all_storage_classes['contacts']
        if ( contact_set ) {
            for ( let c of contact_list ) {
                contact_set[c.id] = structuredClone(c)
            }
        }
    }


    /**
     * 
     * @param {object} contact_object 
     */
    remove_contact(contact_object) {
        let contact_set = this.all_storage_classes['contacts']
        let id = contact_object.id
        delete contact_set[id]
    }


    /**
     * 
     * @returns {Array}
     */
    get_contacts() {
        let contact_set = this.all_storage_classes['contacts']
        return Object.values(contact_set)
    }

}


class RepoBridgeOps {
    
    constructor(a,b,c) {
        this.largest_id = 100
        this.cache = new LocalCacheStorage()

        let cat_list = this.cache.mail_classes()
        for ( let cat of cat_list ) {
            if ( cat === "contacts" ) {
                this.add_simulation_test_contacts(cat)
                continue
            }
            this.add_simulation_test_data(cat)
        }
    }

    get_asset_file(obj) {
        let file_name = obj.file
        obj.data = "this is a test: " + file_name
        return true
    }

    get_app_file(obj) {
        let file_name = obj.file
        obj.data = "this is a test: " + file_name
        return true
    }

    sendable_proc_data() {
        return (new Date()).toLocaleDateString()
    }

    //
    //     "error": {
    //         "code": -32601,
    //         "message": "Method not found"
    //     },



    get_next_id() {
        this.largest_id++
        return this.largest_id
    }


    add_simulation_test_data(mtype) {
        let date = new Date()
        //
        let bunch_of_mails = [
            { "id" : 1, "sender" : "mail@a.com", "subject" : "this is 1 test", "date" : date.toLocaleString(), "timestamp" : date.getTime(),
                            "category" : "inbox",
                            "recipient" : "richard@myhost.local",
                            "cc" : "",
                            "attachments" : [],
                            "text" : "got 1 message that might have some text", "_count_edits" : 1, "_saved_updates" : [] },
            { "id" : 1, "sender" : "mail@s.com", "subject" : "this is 2 test", "date" : date.toLocaleString(), "timestamp" : date.getTime(),
                            "category" : "inbox",
                            "recipient" : "richard@myhost.local",
                            "cc" : "",
                            "attachments" : [],
                            "text" : "got 2 message that might have some text", "_count_edits" : 1, "_saved_updates" : [] },
            { "id" : 1, "sender" : "mail@d.com", "subject" : "this is 3 test", "date" : date.toLocaleString(), "timestamp" : date.getTime(),
                            "category" : "inbox",
                            "recipient" : "richard@myhost.local",
                            "cc" : "",
                            "attachments" : [],
                            "text" : "got 3 message that might have some text", "_count_edits" : 1, "_saved_updates" : [] },
            { "id" : 1, "sender" : "mail@f.com", "subject" : "this is 4 test", "date" : date.toLocaleString(), "timestamp" : date.getTime(),
                            "category" : "inbox",
                            "recipient" : "richard@myhost.local",
                            "cc" : "",
                            "attachments" : [],
                            "text" : "got 4 message that might have some text", "_count_edits" : 1, "_saved_updates" : [] },
            { "id" : 1, "sender" : "mail@g.com", "subject" : "this is 5 test", "date" : date.toLocaleString(), "timestamp" : date.getTime(),
                            "category" : "inbox",
                            "recipient" : "richard@myhost.local",
                            "cc" : "",
                            "attachments" : [],
                            "text" : "got 5 message that might have some text", "_count_edits" : 1, "_saved_updates" : [] },
        ]

        let new_mail_bunch = bunch_of_mails

        for ( let m of new_mail_bunch ) {
            m.id = this.get_next_id()
            //
            let d = new Date()
            m.date = d.toLocaleString()
            m.timestamp = d.getTime()
            m.category = mtype
        }
        if ( (mtype === "drafts") || (mtype === "sent") ) {
            for ( let m of new_mail_bunch ) {
                let recip = m.recipient
                m.recipient = m.sender
                m.sender = recip
            }
        }

        let j = 0
        for ( let m of new_mail_bunch ) {
            let a1 = new Attachment(this.get_next_id(),`at-test ${j++}`,"This is a test of the attachments")
            m.attachments.push(a1)
            let a2 = new Attachment(this.get_next_id(),`at-test ${j++}`,"This is a test of more attachments")
            m.attachments.push(a2)
        }

        this.cache.store_mails(mtype,new_mail_bunch)
    }


    add_simulation_test_contacts(cat) {
        let bunch_of_contacts = [
            { "id" : 1, "email" : "mail@a.com", "name" : "this is 1 test", "date" : date.toLocaleString(), "timestamp" : date.getTime(),
                            "text" : "got 1 contact that might have some text", "_count_edits" : 0, "_saved_updates" : []  },
            { "id" : 1, "email" : "mail@s.com", "name" : "this is 2 test", "date" : date.toLocaleString(), "timestamp" : date.getTime(),
                            "text" : "got 2 contact that might have some text", "_count_edits" : 0, "_saved_updates" : [] },
            { "id" : 1, "email" : "mail@d.com", "name" : "this is 3 test", "date" : date.toLocaleString(), "timestamp" : date.getTime(),
                            "text" : "got 3 contact that might have some text", "_count_edits" : 0, "_saved_updates" : [] },
            { "id" : 1, "email" : "mail@f.com", "name" : "this is 4 test", "date" : date.toLocaleString(), "timestamp" : date.getTime(),
                            "text" : "got 4 contact that might have some text", "_count_edits" : 0, "_saved_updates" : [] },
            { "id" : 1, "email" : "mail@g.com", "name" : "this is 5 test", "date" : date.toLocaleString(), "timestamp" : date.getTime(),
                            "text" : "got 5 contact that might have some text", "_count_edits" : 0, "_saved_updates" : [] },
        ]
       // 
        let new_contact_bunch = structuredClone(bunch_of_contacts)
        for ( let c of new_contact_bunch ) {
            c.id = get_next_id()
            //
            let d = new Date()
            c.date = d.toLocaleString()
            c.timestamp = d.getTime()
            c._count_edits = 1
        }

        this.cache.store_contacts(new_contact_bunch)
    }


    /**
     * 
     * @param {object} params 
     * @returns {Array}
     */
    async gather_and_output_emails(params) {
        //
        let mtype = params.mail_type
        let emails = this.cache.get_emails(mtype)
        return emails
    }

    async gather_and_output_contacts(params) {
        let contacts = this.cache.get_contacts()
        return contacts
    }

    /**
     * 
     * @param {string} id 
     * @param {string} method 
     * @param {any} params 
     * @returns {object}
     */
    async handle_rpc(method,params) {
        //
        let results = {
            "error" : {"code": -32601, "message": "Method not found"}
        }
        //
        switch (method) {
            case "get-mail" : { 
                results = {
                    "result" : await this.gather_and_output_emails(params)
                }
                break;
            }
            case "store-mail" : {
                let mail_list = params.params
                if ( mail_list && Array.isArray(mail_list) && mail_list.length ) {
                    let mtype = params.mail_type
                    this.cache.store_mails(mtype,mail_list)
                    results = {
                        "result" : true
                    }
                }
                break;
            }
            case "remove-mail" :  {
                let mail_list = params.params
                if ( mail_list && Array.isArray(mail_list) && mail_list.length ) {
                    let mtype = params.mail_type
                    this.cache.remove_mails(mtype,mail_list)
                    results = {
                        "result" : true
                    }
                }
                break;
            }
            case "send-mail" :  {
                let mail_obj_list = params.params
                if ( mail_obj_list && Array.isArray(mail_obj_list) && mail_obj_list.length ) {
                    let mtype = params.mail_type
                    let mail_id_list = mail_obj_list.map(obj => { return obj.id })
                    this.cache.remove_mails(mtype,mail_id_list)
                    this.cache.store_mails(mtype,mail_obj_list)
                    results = {
                        "result" : true
                    }
                }
                break;
            }
            case "store-draft" :  {
                let mail_object = params.params
                if ( mail_object ) {
                    let mtype = params.mail_type
                    this.cache.store_mails(mtype,[mail_object])
                    results = {
                        "result" : true
                    }
                }
                break;
            }
            case "get-contacts" :  {
                results = {
                    "result" :  await this.gather_and_output_contacts(params)
                }
                break;
            }
            case "store-contact" :  {
                let contact_object = params.params
                if ( contact_object ) {
                    // let mtype = params.mail_type
                    this.cache.store_contacts([contact_object])
                    results = {
                        "result" : true
                    }
                }
                break;
            }
            case "remove-contact" :  {
                 let contact_object = params.params
                if ( contact_object ) {
                    // let mtype = params.mail_type
                    this.cache.remove_contact(contact_object)
                    results = {
                        "result" : true
                    }
                }
               break;
            }
        }

        // ---- ---- ---- ---- ---- ----
        // //
        // ---- ---- ---- ---- ---- ----
        return results
    }


    //
    /**
     * 
     * @param {string} method 
     * @param {any} params 
     * @returns {boolean}
     */
    handle_rpc_notify(method,params) {
        return true
    }

}



module.exports = RepoBridgeOps