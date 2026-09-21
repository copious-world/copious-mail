


class Attachment {
    constructor(id,title,data) {
        this.id = id
        this.title = title
        this.data = data
    }
}



class RepoBridgeOps {
    
    constructor(a,b,c) {
        this.largest_id = 100
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


    /**
     * 
     * @param {string} id 
     * @param {string} method 
     * @param {any} params 
     * @returns {object}
     */
    async handle_rpc(id,method,params) {
        //
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

        let mtype = params.mail_type


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


        //
        //
        let messages = {
            "result" : bunch_of_mails      // long list of messages
        }

        // let errors = {
        //     "error" : {
        //         "code" : "-1",
        //         "message" : "generic rpc error"
        //     }
        // }

        return messages
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