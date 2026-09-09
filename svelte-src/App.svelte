<!-- https://eugenkiss.github.io/7guis/tasks#crud -->
<script>
	//
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import { onMount } from 'svelte';
	import FloatWindow from './FloatWindow.svelte';
	import MessageDisplay from './MessageDisplay.svelte'
	import MessageEditor from './MessageEditor.svelte'
	import MessageListEdit from './MessageListEditor.svelte'
	//
	import * as ipfs_profiles from './ipfs_profile_proxy.js'
	import * as utils from './utilities.js'

	let active_profile_image = ""; //"/favicon.png" ; // "/brent-fox-jane-18-b.jpg"
	let active_profile_biometric = ""
	//
	let src_1_name = "Drop a picture here"
	let src_biometric_instruct = "Drop binary biometric file here"
	//
	let active_cid = ""
	let clear_cid = ""
	let dir_view = false

	let signup_status = "OK"
	//
	let start_of_messages = 0
	let messages_per_page = 100

	let prefix = '';
	let man_prefix = '';
	let i = 0;
	let c_i = 0;
	let i_i = 0;
	let p_i = 0;
	let form_index = 0

	let j_cid = false

	let name = ''
	let DOB = ''
	let place_of_origin = ''
	let cool_public_info = ''
	let business = false
	let biometric_blob = ''

	let c_name = ''
	let c_DOB = ''
	let c_place_of_origin = ''
	let c_cool_public_info = ''
	let c_business = false
	let c_public_key = "testesttesttest"
	let c_signer_public_key = "testesttesttest"
	let c_cid = "testesttesttest"
	let c_answer_message = ''
	let c_biometric_blob = ''

	let c_empty_fields = false

	let today = (new Date()).toUTCString()

	let active_user = false
	let active_identity = false
	let known_users = [false]
	let known_identities = [false]
  	let u_index = 0

	let adding_new = false
	
	let manifest_selected_entry = false
	let manifest_selected_form = false
	let manifest_contact_form_list = [false]
	//
	let manifest_obj = {}
	let manifest_index = 0
	let man_title = ''
	let man_cid = ''
	let man_wrapped_key = ''
	let man_html = ''
	let man_max_preference = 1.0
	let man_preference = 1.0
	//
	let man_sel_not_customized = true
	let man_contact_is_default = false

	//
	let man_encrypted = false

	let message_edit_from_contact = false

	let profile_image_el
	let biometric_data_el

	//
	let active = 'Identify';
	let prev_active = active
	let first_message = 0

	let green = false     // an indicator telling if this user ID is set
	let todays_date = (new Date()).toLocaleString()

	let filtered_cc_list = []

	let message_op_category = "read"
	let source_category = "messages"
	let processed_category = "Use Op to Select"

	// This is just a default... It will be used until the user picks something else 
	// when editing the manifest.
	let selected_form_link_types = {
		"business" : {
			"link" : "latest-contact",
			"from_cid" : "QmTfD2LyTy8WGgdUkKE1Z1vAfb6HwNgmZA5kMaFAiy4fuz"
		},
		"profile" : {
			"link" : "latest-contact",
			"from_cid" : "QmTfD2LyTy8WGgdUkKE1Z1vAfb6HwNgmZA5kMaFAiy4fuz"
		}
	}

	let selected_form_link = selected_form_link_types["profile"]
	

	//
	let individuals = [
		{ "name": 'Hans Solo', "DOB" : "1000", "place_of_origin" : "alpha centauri", "cool_public_info" : "He is a Master Jedi", "business" : false, "public_key" : "testesttesttest", "signer_public_key" : "ha ha ha ha ha ha ha ", "cid" : "4504385938", "answer_message" : "", "biometric" : "53535" }
	];

	let cid_individuals_map = {}

	let selected = individuals[0]

	let inbound_solicitation_messages = [ { "name": 'Darth Vadar', "user_cid" : "869968609", "subject" : "Hans Solo is Mean", "date" : todays_date, "readers" : "luke,martha,chewy", "business" : false, "public_key" : false, "message" : "this is a message 4" , "reply_with" : "default"} ]
	let inbound_contact_messages = [
		{ "name": 'Hans Solo', "user_cid" : "4504385938", "subject" : "Darth Vadier Attacks", "date" : todays_date, "readers" : "joe,jane,harry", "business" : false, "public_key" : false, "message" : "this is a message 1" }
	]


	let processed_messages = []

	let message_selected = { "name": 'Admin', "subject" : "Hello From copious.world", "date" : today, "readers" : "you", "business" : false, "public_key" : false }



	let message_edit_list_name = ""
	let message_edit_type = "message"
	let message_edit_list = []
	let message_edit_source = false

	function reinitialize_user_context() {
		active_cid = ""
		clear_cid = ""
		dir_view = false
		signup_status = "OK"
	//
		start_of_messages = 0
		messages_per_page = 100
		//
		active_profile_image = ""
		//
		prefix = '';
		man_prefix = '';
		i = 0;
		c_i = 0;
		i_i = 0;
		p_i = 0;
		form_index = 0
		//
		c_name = ''
		c_DOB = ''
		c_place_of_origin = ''
		c_cool_public_info = ''
		c_business = false
		c_public_key = "testesttesttest"
		c_signer_public_key = "testesttesttest"
		c_cid = "testesttesttest"
		c_answer_message = ''
		c_empty_fields = false
		//
		today = (new Date()).toUTCString()
		adding_new = false
		manifest_selected_entry = false
		manifest_selected_form = false
		manifest_contact_form_list = [false]
		manifest_obj = {}
		manifest_index = 0
		man_title = ''
		man_cid = ''
		man_wrapped_key = ''
		man_html = ''
		man_max_preference = 1.0
		man_preference = 1.0
		man_encrypted = false
		first_message = 0
		green = false     // an indicator telling if this user ID is set
		todays_date = (new Date()).toLocaleString()
		individuals = [
			{ "name": 'Hans Solo', "DOB" : "1000", "place_of_origin" : "alpha centauri", "cool_public_info" : "He is a Master Jedi", "business" : false, "public_key" : "testesttesttest", "signer_public_key" : "ha ha ha ha ha ha ha ", "cid" : "4504385938", "answer_message" : "", "biometric" : "53535" }
		];
		cid_individuals_map = {}
		inbound_solicitation_messages = [ { 
			"name": 'Darth Vadar', 
			"user_cid" : "869968609", 
			"subject" : "Hans Solo is Mean", 
			"date" : todays_date, 
			"readers" : "luke,martha,chewy", 
			"business" : false, 
			"public_key" : false, 
			"message" : "this is a message 4",
			"reply_with" : "default" } ]
		inbound_contact_messages = [
			{ "name": 'Hans Solo', "user_cid" : "4504385938", "subject" : "Darth Vadier Attacks", "date" : todays_date, "readers" : "joe,jane,harry", "business" : false, "public_key" : false, "message" : "this is a message 1" }
		]

		processed_messages = []

		message_selected = { "name": 'Admin', "subject" : "Hello From copious.world", "date" : today, "readers" : "you", "business" : false, "public_key" : false }

		update_selected_form_links()
	}

	async function handle_message(evt) {
		let cmd = evt.detail.cmd
		switch ( cmd ) {
			case "new-contact" : {
				// from display -- sender initiated -- got sender public keys 
				// -- send yours automatically since you already accepted
				let signer_pk = evt.detail.signer_public_key
				let added = await auto_add_contact(evt.detail.cid,signer_pk,true,message_selected)
				message_selected.is_in_contacts = added
				break;
			}
			case "reply": {
				selected.answer_message = true
				message_edit_from_contact = false
				start_floating_window(1);
			}
			case "view-processed-messages": {
				message_op_category = evt.detail.category
				processed_category = message_op_category
				source_category = message_op_category
				processed_messages = await fetch_category_messages(active_identity,message_op_category)
				break;
			}
			case 'move-messages': {
				if ( !active_identity ) return
				let cat =  evt.detail.category
				if ( (cat === source_category) && !(message_op_category === 'intros' || message_op_category === 'messages')) return
				let user_cid = active_identity.cid
				if ( active === 'Introductions' ) {
					user_cid = active_identity.clear_cid
				}
				let dst_cid = active_identity.cid
				let business = active_identity.user_info.business
				//
				// message_edit_list containes message from message_op_category
				// they are being sent to cat
				//
				let src_cat = false
				if ( (message_op_category !== 'messages') && (message_op_category !== 'intros') ) {
					src_cat = message_op_category
				}
				await ipfs_profiles.message_list_ops(user_cid,dst_cid,'move',cat,business,message_edit_list,src_cat)
				//
				//message_edit_source
				let status = remove_from_source_list(message_edit_source,message_edit_list)
				if ( status == false ) {
					console.log("no message removed")
				}
				break;
			}
			default: {
				console.log("message cmd not handled")
			}
		}
	}

	/*
      "wrapped_key" : false,
      "encoding" : "uri",
	  "when"  ... whereas"date" is a human readable string...
	*/

	//
	class Contact {
		//
		constructor() {
			this.empty_identity = {
				"name": '',
				"DOB" : "",
				"place_of_origin" : "", 
				"cool_public_info" : "", 
				"business" : false, 
				"public_key" : false,
				"signer_public_key" : false,
				"biometric" : false
			}
			this.data = this.empty_identity
		}
		//
		set(name,DOB,place_of_origin,cool_public_info,business,public_key,signer_public_key,biometric_blob) {
			let user_data = {
				"name": name,
				"DOB" : DOB,
				"place_of_origin" : place_of_origin, 
				"cool_public_info" : cool_public_info, 
				"business" : (business === undefined) ? false : business, 
				"public_key" : public_key,
				"signer_public_key" : signer_public_key,
				"biometric" : biometric_blob
			}
			this.data = user_data
		}

		copy(contact_info) {
			let data = {}
			for ( let ky in this.empty_identity ) {
				data[ky] = contact_info[ky]
			}
			this.data = data
		}

		match(contact_info) {
			let f_match = true
			f_match = f_match && ( this.data.name === contact_info.name )
			f_match = f_match && ( this.data.DOB === contact_info.DOB )
			f_match = f_match && ( this.data.place_of_origin === contact_info.place_of_origin )
			f_match = f_match && ( this.data.cool_public_info === contact_info.cool_public_info )
			f_match = f_match && ( this.data.business === contact_info.business )
			return f_match
		}
		
		extend_contact(field,value) {
			this.data[field] = value;
		}

		get_field(field) {
			return this.data[field]
		}

		identity() {
			let id_obj = Object.assign(this.empty_identity,this.data)
			return id_obj
		}

		clear_identity() {
			let id_obj = {
				"name": this.data.name,
				"DOB" : this.data.DOB,
				"place_of_origin" : this.data.place_of_origin, 
				"cool_public_info" : this.data.cool_public_info, 
				"business" : this.data.business, 
			}
			return id_obj
		}

	}

	let empty_identity = new Contact()

	//


	// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

	$: filteredIndviduals = prefix
		? individuals.filter(individual => {
			const name = `${individual.name}`;
			return name.toLowerCase().startsWith(prefix.toLowerCase());
		})
		: individuals;

	$: selected = (i >= 0) ? filteredIndviduals[i] : empty_identity.identity()

	$: reset_inputs(selected)

	$: if ( active_identity ) {
		filtered_cc_list = individuals.filter(ident => {
			if ( ident.cid !== active_identity.cid ) {
				return true
			}
			return false
		})
	}

	//
	//
	$: active_user = known_users[u_index]
	$: active_identity = known_identities[u_index]
	$: green = ( active_identity ) ? active_identity.stored_externally : false
	$: {
		if ( active_user ) {
			window.set_user_title(active_user.name)
		}
	}

	let current_index = -1


	$: {
		if ( (active_user !== undefined) && active_user ) {
			name = active_user.name
			DOB = active_user.DOB
			place_of_origin = active_user.place_of_origin
			cool_public_info = active_user.cool_public_info
			business = active_user.business
			adding_new = false
		}
	}

	$: {
		if ( current_index !== u_index ) {
			current_index = u_index
			reinitialize_user_context()
		}
		if ( active_identity ) {
			load_user_info(active_identity)
		}
	}

	$: filtered_manifest_contact_form_list = man_prefix
		? manifest_contact_form_list.filter(man_contact => {
			const name = `${man_contact.name}`;
			return name.toLowerCase().startsWith(man_prefix.toLowerCase());
		})
		: manifest_contact_form_list;

	$: {
		manifest_selected_entry = filtered_manifest_contact_form_list[manifest_index]
		if ( (manifest_selected_entry !== undefined) && manifest_selected_entry ) {
			manifest_selected_form = manifest_selected_entry.html
			man_title = manifest_selected_entry.info
			man_max_preference = manifest_obj.max_preference
			man_preference = manifest_selected_entry.preference
			man_cid = manifest_selected_entry.cid

			man_contact_is_default = ( man_cid === manifest_obj.default_contact_form)
		}
	}

	$: c_empty_fields = ((!c_name || (c_name.length == 0) ) 
						|| (!c_DOB || (c_DOB.length == 0) ) 
						|| (!c_place_of_origin 
						|| (c_place_of_origin.length == 0) )
						|| (c_cool_public_info.length == 0))
						

	$: {
		if ( prev_active !== active ) {
			message_edit_list = []
			message_edit_source = false
			if ( active == "Introductions" ) {
				message_op_category = "intros"
			} else if ( active == "Messages" ) {
				message_op_category = "messages"
			}
		}
		prev_active = active
	}
	// ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
 
	let creator_disabled = false
	let creation_to_do = false
	$: {
		creation_to_do = ( (u_index === false) || (active_user && (active_user.biometric === undefined)) )
		if ( (typeof active_cid === "string") && (active_cid.length === 0) ) {
			creation_to_do = true
		}
		creator_disabled = !creation_to_do
		console.log(active_cid)
	}

	let window_scale = { "w" : 0.4, "h" : 0.8 }
	let edit_popup_scale = { "w" : 0.45, "h" : 0.3}

	let all_window_scales = []
	all_window_scales.push(window_scale)
	all_window_scales.push(window_scale)
	all_window_scales.push(edit_popup_scale)


	function popup_size() {
		let smallest_w = 200   // smallest and bigget willing to accomodate
		let biggest_w = 3000

		let smallest_h = 600
		let biggest_h = 1000

		// bounded window width
		let w = Math.max(smallest_w,window.innerWidth)
		w = Math.min(biggest_w,w)

		// bounded window height
		let h = Math.max(smallest_h,window.innerHeight)
		h = Math.min(biggest_h,h)

		let p_range
		let P
		//	percentage h range 
		let h_p_max = 0.96
		let h_p_min = 0.75
		p_range = h_p_max - h_p_min
		P = (biggest_h - h)/(biggest_h - smallest_h)
		//console.log("P h: " + P)
		let h_scale = P*(p_range) + h_p_min

		//	percentage w range 
		let w_p_max = 0.96
		let w_p_min = 0.20
		p_range = w_p_max - w_p_min
		P = (biggest_w - w)/(biggest_w - smallest_w)
		//console.log("P w: " + P)
		let w_scale = P*(p_range) + w_p_min

		// Setting the current height & width 
		// to the elements 

		return { "w" : w_scale, "h" : h_scale }
	}

	//
	window_scale = popup_size()
	all_window_scales[0] = window_scale
	all_window_scales[1] = window_scale

	//
	onMount(async () => {
		//
		window.addEventListener("resize", (e) => {
			//
			let scale = popup_size()
			//
			window_scale.h = scale.h; 
			window_scale.w = scale.w;
			all_window_scales[0] = window_scale
			all_window_scales[1] = window_scale
			//
		})

		await startup()
			// initialize
		await get_active_users()  // updates login page and initializes the view of this user.
	})

	async function update_selected_form_link(type) {
		let form_link = selected_form_link_types[type]
		if ( !(form_link.from_cid) ) {
			let template_name = form_link.link
			let cid = await ipfs_profiles.get_named_contact_template_cid(template_name,type)
			form_link.from_cid = cid
		}
	}


	async function update_selected_form_links() {
		await update_selected_form_link("profile")
		await update_selected_form_link("business")
	}


// PROFILE  PROFILE  PROFILE  PROFILE  PROFILE  PROFILE  PROFILE 
// PROFILE  PROFILE  PROFILE  PROFILE  PROFILE  PROFILE  PROFILE 

	let g_required_user_fields = [ "name", "DOB", "place_of_origin", "cool_public_info", "biometric" ]
	let g_renamed_user_fields = {
		"DOB" : "Year of inception",
		"place_of_origin" : "Main Office",
	}
	let g_last_inspected_field = false
	function check_required_fields(object,required_fields) {
		g_last_inspected_field = false
		for ( let field of required_fields ) {
			let value = object[field]
			g_last_inspected_field = field
			if (( value === undefined) || (value.length === 0) ) return false
		}
		return true
	}

	function missing_fields(activity,app_rename,do_rename) {
		let l_field = g_last_inspected_field
		// 
		if ( do_rename ) {
			let r_field = app_rename[l_field]
			if ( r_field ) {
				l_field = r_field
			}
		}
		let message = `Missing field: ${l_field},  when ${activity}`
		return(message);
	}


	// ADD PROFILE.....
	async function add_profile() {
		//
		let contact = new Contact()		// contact of self... Stores the same info as a contact plus some special fields for local db
		contact.set(name,DOB,place_of_origin,cool_public_info,business,false,false,biometric_blob)
		//
		selected_form_link = selected_form_link_types[ (business ? "business" : "profile") ]
		contact.extend_contact("form_link",selected_form_link)
		contact.extend_contact("answer_message","")
		//
		let user_data = contact.identity()
		//
		signup_status = "OK"
		if ( !check_required_fields(user_data,g_required_user_fields) ) {
			signup_status = missing_fields("creating contact page",g_renamed_user_fields,business)
			return;
		}

		await gen_public_key(user_data) // by ref  // stores keys in DB  // converts biometric to signature (calls protect_hash)
		try {
			green = await ipfs_profiles.add_profile(user_data)  // will fetch the key (it is not riding along yet.)
		} catch (e) {
		}
		//
		await get_active_users()  // updates login page and initializes the view of this user.
		u_index = (known_users.length - 1)	// user was added to the end...
		//
	}

	async function load_user_info(identity) {
		active_cid = identity.cid
		clear_cid = identity.clear_cid

		await fix_keys(identity)

		await fetch_contacts(identity)
		//
		fetch_messages(identity)
		fetch_manifest(identity)

		if ( identity.profile_image ) {
			let img_cid = identity.profile_image
			active_profile_image = await ipfs_profiles.load_blob_as_url(img_cid)
		}

		/*
		let manifest_cid = identity.files.cid
		let contacts_cid = identity.files.cid

		let dir_contact_pages_cid = identity.dirs.cid
		let dir_spool_cid = identity.dirs.cid
		*/
	}

	async function get_active_users() {
		try {
			let known_user_lists = await window.get_known_users()
			known_users = known_user_lists[0]
			known_identities = known_user_lists[1]
		} catch (e) {}
	}


	function clear_identify_form() {
		name = ''
		DOB = ''
		place_of_origin = ''
		cool_public_info = ''
		biometric_blob = ''
		business = false
		active_user = false
		active_identity = false
		u_index = false
		adding_new = true
	}

	async function remove_identify_seen_in_form() {
		let identity = active_identity
		const index = known_users.indexOf(active_user);
		if ( index >= 0 ) {
			known_users = [...known_users.slice(0, index), ...known_users.slice(index + 1)];
			u_index = Math.min(u_index, known_users.length - 1);
			await unstore_user(identity)
		}
	}

	async function drop_picture(ev) {
		ev.preventDefault();
		try {
			let files = ev.dataTransfer.files ? ev.dataTransfer.files : false
			let items = ev.dataTransfer.items ? ev.dataTransfer.items : false
			let [fname,blob64] = await utils.drop(items,files)
			//
			fname = `images/contact`
			let identity = active_identity
			if ( identity ) {
				active_profile_image = blob64
				//
				let fcid = await ipfs_profiles.upload_data_file(fname,blob64)
				if ( fcid ) {
					identity.profile_image = fcid
					await update_identity(identity)
				}
			}
		} catch (e) {
			console.log(e)
		}
	}

	async function drop_biometric(ev) {
		ev.preventDefault();
		try {
			let files = ev.dataTransfer.files ? ev.dataTransfer.files : false
			let items = ev.dataTransfer.items ? ev.dataTransfer.items : false
			let [fname,blob64] = await utils.drop(items,files)
			biometric_blob = blob64
			src_biometric_instruct = "Biometric has been dropped."
			//
		} catch (e) {
			console.log(e)
		}
	}

	function dragover_picture(ev) {
		ev.preventDefault();
	}


// MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES
// MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES


	function pop_editor() {
		message_edit_from_contact = true
		selected.answer_message = false
		filtered_cc_list = filtered_cc_list.filter(ident => {
			return ident.cid !== selected.cid
		})
		start_floating_window(1);
	}

	function show_subject() {

	}


	// ---- ---- ---- ---- ---- ---- ---- ---- ---- ----


	function clear_checks(pattern,n) {
		let i = 0
		let el = false
		do {
			let el_id = `${pattern}${i}`
			el = document.getElementById(el_id)
			if ( el ) {
				el.checked = false
			}
			i++
		} while ( el )
	}

 
	function get_selected_message(dom_el,parts_of_0) {
		let found_message = false
		if ( dom_el && (dom_el.id.length === 0) ) {
			do {
				dom_el = dom_el.parentNode;
			} while ( dom_el && (dom_el.id.length === 0) )
		}
		if ( dom_el && (dom_el.id.length !== 0) ) {
			let parts = dom_el.id.split('_')
			if ( parts[0] === parts_of_0 ) {
				if ( parts[1] === 'contact' ) {
					let index = parseInt(parts[2])
					message_edit_source = inbound_contact_messages
					found_message = inbound_contact_messages[index]
				} else if ( parts[1] === 'intro' ) {
					let index = parseInt(parts[2])
					message_edit_source = inbound_solicitation_messages
					found_message = inbound_solicitation_messages[index]
				} else if ( parts[1] === 'category' ) { // category
					let index = parseInt(parts[2])
					message_edit_source = processed_messages
					found_message = processed_messages[index]
				}
			}
		}
		return found_message
	}


	function remove_from_source_list(m_source,m_changed) {
		//
		let op_list = []
		if ( active == "Messages" ) {
			op_list = inbound_contact_messages
			if ( m_source !== op_list ) return false;
		} else if ( active == "Introductions" ) {
			op_list = inbound_solicitation_messages
			if ( m_source !== op_list ) return false;
		} else {
			op_list = processed_messages
			if ( m_source !== op_list ) return false;
		}
		//
		let changed_list = op_list.filter(m_el => {
			let cid = m_el.f_cid
			if ( cid ) {
				if ( m_changed.indexOf(cid) >= 0 ) return false
			}
			return true
		})
		//
		if ( active === "Messages" ) {
			inbound_contact_messages  = changed_list
			clear_checks("doop-m_contact_",changed_list.length)
		} else if ( active === "Introductions" ) {
			inbound_solicitation_messages  = changed_list
			clear_checks("doop-m_intro_",changed_list.length)
		} else {
			processed_messages  = changed_list
			clear_checks("doop-m_category_",changed_list.length)
		}
		//
	}

	// ---- check_box_block
	// ---- 
	function check_box_block(ev) {
		ev.stopPropagation()
		// enter or remove element into the operation list....
		let dom_el = ev.target
		let m = get_selected_message(dom_el,'doop-m')
		if ( m ) {
			if ( dom_el.checked ) {
				message_edit_list.push(m.f_cid)
			} else {
				const index = message_edit_list.indexOf(m.f_cid);
				message_edit_list = [...message_edit_list.slice(0, index), ...message_edit_list.slice(index + 1)];
			}
		}
		console.log(message_edit_list)
	}


	function doops_messages(ev) {
		//
		message_edit_list_name = "Message Ops"
		message_edit_type = "message"

		//
		start_floating_window(2);
	}


	function doops_processed(ev) {
		message_edit_list_name = "Processed Message Ops"
		message_edit_type = "message"
		//
		start_floating_window(2);
	}

	function doops_intros(ev) {
		message_edit_list_name = "Introduction Ops"
		message_edit_type = "introduction"
		//
		start_floating_window(2);
	}

	function full_message(ev) {
		if ( ev ) {
			let dom_el = ev.target;
			let m = get_selected_message(dom_el,'m')
			if ( m ) {
				message_selected = m
				let contact = find_contact_from_message(message_selected)
				if ( contact ) {
					contact.answer_message = `&lt;subject ${message_selected.subject}&gt;<br>` + message_selected.message
				}
				start_floating_window(0);
			}
		}
	}


	async function fetch_messages(identify) {
		if ( identify ) {
			let all_inbound_messages = await ipfs_profiles.get_message_files(identify,start_of_messages,messages_per_page)
			inbound_contact_messages = all_inbound_messages[0]
			inbound_solicitation_messages = all_inbound_messages[1]

			if ( inbound_contact_messages === false ) {
				inbound_contact_messages = []
			}
			if ( inbound_solicitation_messages === false ) {
				inbound_solicitation_messages = []
			}
			//
			await check_contacts(inbound_contact_messages,false)
			let auto_responses = await check_contacts(inbound_solicitation_messages,true)
			inbound_solicitation_messages = inbound_solicitation_messages.filter(m => {
				return (auto_responses.indexOf(m) < 0)
			})
		}
	}
	
	async function fetch_category_messages(identify,op_category) {
		if ( identify ) {
			let start = start_of_messages ? start_of_messages : 0
			let count = messages_per_page ? messages_per_page : 100
			let inbound_messages = await ipfs_profiles.get_categorized_message_files(identify,op_category,start,count)
			return inbound_messages
		}
	}

	
	function messages_update_contacts(cid,bval) {
		if ( Array.isArray(inbound_contact_messages) ) {
			for ( let m of inbound_contact_messages ) {
				if ( m.user_cid === cid ) {
					m.is_in_contacts = bval
				}
			}
		}
		if ( Array.isArray(inbound_contact_messages) ) {
			for ( let m of inbound_solicitation_messages ) {
				if ( m.user_cid === cid ) {
					m.is_in_contacts = bval
				}
			}
		}
	}

// CONTACTS CONTACTS CONTACTS CONTACTS CONTACTS CONTACTS CONTACTS CONTACTS
// CONTACTS CONTACTS CONTACTS CONTACTS CONTACTS CONTACTS CONTACTS CONTACTS

	function make_individuals_map(indivs_map) {
		if ( Array.isArray(indivs_map) ) {
			cid_individuals_map = {}
			for ( let indiv of indivs_map ) {
				if ( indiv && (typeof indiv !== "string") ) {
					cid_individuals_map[indiv.cid] = indiv
				}
			}
		} else {
			cid_individuals_map = Object.assign(cid_individuals_map,indivs_map)
		}
		window.set_contact_map(cid_individuals_map)
	}

	function find_contact_from_message(message) {
		if ( message === undefined ) return false
		for ( let contact of individuals ) {
			if ( (contact.name == message.name) && (message.user_cid === contact.cid) ) {
				return contact
			}
		}
		return false
	}

	async function check_contacts(message_list,clear) {
		let removals = []
		if ( Array.isArray(message_list) ) {
			for ( let m of message_list ) { 
				// This will be false -- 
				// the introduction will supply the sender (from) cid for the keyed path.
				let is = (cid_individuals_map[m.user_cid] !== undefined)
				m.is_in_contacts = is
				//
				if ( is && clear ) {
					let c = cid_individuals_map[m.user_cid]
					let do_update = await check_for_auto_update(c,m)
					if ( do_update ) {
						if ( c.public_key && c.signer_public_key ) {
							let contact = contact_wrapper(c)
							if ( contact ) {
								await respond_to_intro(m,contact)
							}
						} else {
							auto_add_contact(m.user_cid,m.signer_public_key,c.must_send_keys,m)
							removals.push(m)
						}
					}
				} else if ( clear ) {
					if ( m.response_acceptance ) {
						auto_add_contact(m.user_cid,m.signer_public_key,false,m)
						removals.push(m)
					}
				}
			}
		}
		return removals
	}

	//
	async function check_for_auto_update(c,m) {
		//
		if ( c.must_send_keys === undefined ) return false
		//
		if ( !(c.received_keys) ) {
			if ( c.public_key && c.signer_public_key ) {
				c.received_keys = true
				await update_contact()
				return false
			}
			let cid = m.user_cid
			if ( cid ) {
				if ( active_identity.introductions ) {
					let intros = active_identity.introductions
					if ( intros.indexOf(cid) >= 0 ) {
						return true
					}
				} else return true // let "received_keys" make the decision.
			}
		} else {
			if ( c.must_send_keys ) {
				if ( c.public_key && c.signer_public_key ) {
					return true
				}
			}
		}
		//
		return false
	}

	//
	async function get_contact_info(cid) {
		let user_info = await ipfs_profiles.fetch_contact_info(cid)
		if ( !user_info ) {
			alert("get_contact_info: user does not exist")
		}
		return user_info
	}


	function reset_inputs(individual) {
		c_name = individual ? individual.name : '';
		c_DOB = individual ? individual.DOB : '';
		c_place_of_origin = individual ? individual.place_of_origin : '';
		c_cool_public_info = individual ? individual.cool_public_info : '';
		c_business = individual ? individual.business : '';
		c_public_key = individual ? individual.public_key : '';
		c_signer_public_key = individual ? individual.signer_public_key : '';
		c_answer_message = individual ? individual.answer_message : '';
		c_cid = individual ? individual.cid : '';
	}

	let pre_clear_i = 0
	let cleared_c_form = false
	function clear_contact_form() {
		pre_clear_i = i
		i = -1
		reset_inputs(false)
		cleared_c_form = true
	}

	function harmonize_contact_form(ev) {
		if ( i < 0 ) {
			i = pre_clear_i
			cleared_c_form = false
		} else {
			cleared_c_form = false
		}
	}


	function exising_contact(contact) {
		//
		for ( let cid in cid_individuals_map ) {
			let user_info = cid_individuals_map[cid]
			if ( contact.match(user_info) ) {
				return cid
			}
		}
		//
		return false
	}

	async function respond_to_intro(msg,contact) {
		//
		if ( !(contact) ) return
		//
		let identify = active_identity
		if ( identify ) {
			let message = Object.assign({},msg)   // make a special automatic message. ...
			//
			message.user_cid = identify.cid
			message.public_key = identify.user_info.public_key
			message.signer_public_key = identify.user_info.signer_public_key
			message.date = Date.now()
			message.business = business
			message.response_acceptance = true
			message.attachments = [ msg.user_cid ] //[msg.public_key,msg.signer_public_key]
			//
			let i_cid = await ipfs_profiles.send_introduction(contact.clear_identity(),identify,message)
			if ( i_cid ) {
				contact.extend_contact("must_send_keys",false)  // only comes in from the intro message...
				await update_contact_page()

				if ( identify.introductions === undefined ) {
					identify.introductions = []
				}
				identify.introductions.push(i_cid)
				update_identity(identify)
			}
		}
		//
	}

	async function warn_spoofing(msg,contact) {
		let identify = active_identity
		if ( identify ) {
			//
			let message = Object.assign({},msg)   // make a special automatic message. ...
			//
			message.user_cid = identify.cid
			message.public_key = identify.user_info.public_key
			message.signer_public_key = identify.user_info.signer_public_key
			message.date = Date.now()
			message.business = business
			message.response_acceptance = true
			message.attachments = []
			message.subject = "You received a spurious introduction."
			message.message = `Someone faking my identity sent you a message pretending to be me. Watch out for this user cid: ${msg.user_cid}`
			//
			await ipfs_profiles.send_introduction(contact.clear_identity(),identify,message)
		}
	}

	async function update_contact_page() {
		let identify = active_identity  // write to client user dir
		if ( identify ) {
			let update_cid = await ipfs_profiles.update_contacts_to_ipfs(identify,business,cid_individuals_map)
			identify.files.contacts.cid = update_cid
			await update_identity(identify)
			await get_active_users()
		}
	}


	function contact_wrapper(contact_info) {
		let cid = contact_info.cid
		if ( cid ) {
			//
			let contact = new Contact()
			contact.copy(contact_info)
			return contact
		}
		return false
	}

	// auto_add_contact
	// cid -- came in the message ... this is the sender private path cid.
	// signer_pk is passed.... assuming identity is made by one key -- but it could be two keys, wrapper and signer
	// if approving a contact, then do_response is true, and a message is sent back automatically with the public keys of the current user.
	async function auto_add_contact(cid,signer_pk,do_response,msg) {
		//
		// use the private path cid pull in public wrapper key from here.
		let contact_info = await get_contact_info(cid) 
		//
		if ( contact_info ) {
			//
			let origin_cid = msg.attachments[0]  // should be a cid there
			let a_cid = active_identity.cid
			//
			let contact = new Contact()
			contact.copy(contact_info)
			let old_cid = exising_contact(contact)
			if ( old_cid !== false ) {
				delete cid_individuals_map[old_cid]
				// remove from individuals
			}
			contact.extend_contact("cid",cid)
			contact.extend_contact("answer_message",'')
			contact.extend_contact("signer_public_key",signer_pk)	// only comes in from the intro message...
			contact.extend_contact("received_keys",true)			// If here, then the keys have been received
			if ( origin_cid &&  (origin_cid !== a_cid) ) {
				//
				await warn_spoofing(msg,contact)
				return
				//
			}
			//
			let user_data = contact.identity()
			//
			let b = individuals
			if ( individuals[0] === empty_identity.identity() ) {
				b[0] = user_data
			} else {
				individuals.push(user_data);
			}
			individuals = b
			i = individuals.length - 1;
			//
			cid_individuals_map[cid] = user_data
			messages_update_contacts(cid,false)
			//
			if ( do_response ) {  // When adding a contact from an introduction, send public keys to sender, who does have these keys - yet...
				await respond_to_intro(msg,contact)
				contact.extend_contact("must_send_keys",false)  // only comes in from the intro message...
			}
			await update_contact_page()
			return true
		}
		return false
	}

	async function add_contact() {
		let contact = new Contact()
		contact.set(c_name,c_DOB,c_place_of_origin,c_cool_public_info,c_business,c_public_key,c_signer_public_key,c_biometric_blob)
		contact.extend_contact("cid",'')
		contact.extend_contact("answer_message",'')
		contact.extend_contact("received_keys",false)  // only comes in from the intro message...
		contact.extend_contact("must_send_keys",true)  // only comes in from the intro message...
		//
		let user_data = contact.clear_identity()
		//
		let cid = await ipfs_profiles.fetch_contact_cid(user_data,true)
		if ( cid_individuals_map[cid] === undefined ) {  // the user is already a contact
			user_data.cid = cid
			contact.extend_contact("cid",cid)
			//
			if ( individuals[0] === empty_identity.identity() ) {
				individuals[0] = user_data
			} else {
				individuals.push(user_data);
			}
			//
			i = individuals.length - 1;
			//
			cid_individuals_map[cid] = user_data
			messages_update_contacts(cid,true)
			//
			await update_contact_page()
		}
		//
	}

	async function update_contact() {
		selected.name = c_name;
		selected.DOB = c_DOB;
		selected.place_of_origin = c_place_of_origin;
		selected.cool_public_info = c_cool_public_info;
		selected.business = c_business;
		selected.public_key = c_public_key;
		selected.c_signer_public_key = c_signer_public_key
		//
		let cid = selected.cid
		delete cid_individuals_map[cid]
		messages_update_contacts(cid,false)
		cid = await ipfs_profiles.fetch_contact_cid(selected,((c_signer_public_key !==undefined) && c_signer_public_key))
		selected.cid = cid
		cid_individuals_map[cid] = user_data
		messages_update_contacts(cid,true)
		//
		await update_contact_page()
		//
	}

	async function remove_contact() {
		if ( i < 0 ) return
		// Remove selected person from the source array (people), not the filtered array
		const index = individuals.indexOf(selected);
		individuals = [...individuals.slice(0, index), ...individuals.slice(index + 1)];

		i = Math.min(i, filteredIndviduals.length - 2);

		let cid = selected.cid
		delete cid_individuals_map[cid]
		messages_update_contacts(cid,false)
		//
		await update_contact_page()
		//
	}

	async function fetch_contacts(identify) {
		if ( identify && identify.files ) {
			if ( identify.files.contacts ) {
				let contacts_cid = identify.files.contacts.cid
				let contacts_data = await ipfs_profiles.fetch_contacts(contacts_cid,identify)
				let indivs = []
				if ( Array.isArray(contacts_data) ) {
					indivs = contacts_data.filter(el => {
						let t = (typeof el === "object") && (typeof el !== "string") && (el !== false)
						return t
					})
				} else {
					for ( let ky in contacts_data ) {
						if ( typeof ky === "string" ) {  // make sure this is a cid string
							indivs.push(contacts_data[ky])
						}
					}
				}
				if ( indivs.length === 0 ) {
					individuals = [ empty_identity.identity() ]
				} else {
					individuals = indivs
				}
				make_individuals_map(contacts_data)
			}
		}
	}


	async function app_upload_identity() {
		await upload_identity()
		await get_active_users()  // updates login page and initializes the view of this user.
		u_index = (known_users.length - 1)	// user was added to the end...
	}

	async function app_download_identity() {
		if ( active_identity ) {
			let user_info = active_identity.user_info
			await download_identity(user_info,false)
		}
	}


	// ---- ---- ---- ---- ---- ---- ----

// MANIFEST MANIFEST MANIFEST MANIFEST MANIFEST MANIFEST MANIFEST MANIFEST MANIFEST 

	let cache_contact_form_vars = []


	function expand_el(el) {
		let str = ""
		for ( let ky in el ) {
			let el_it = `<li>
					${ky} : ${JSON.stringify(el[ky])}
					</li>`
			str += el_it
		}
		let el_view = `<ul style="margin-left:4px">
				${str}
			</ul>`
		return el_view
	}

	async function view_user_dir() {
		if ( active_user ) {
			let identify = active_identity
			let dir_data = await ipfs_profiles.get_dir(identify,false)
			let listed = ""
			for ( let el of dir_data ) {
				let el_it = `<li>
					${expand_el(el)}
					</li>`
				listed += el_it
			}
			dir_view = `<ul style="margin-left:12px">
				${listed}
			</ul>`
		}
	}

	function from_dir_data(file_name,dir_data) {
		if ( Array.isArray(dir_data) ) {
			for ( let field of dir_data ) {
				if ( field.file === file_name ) {
					return field
				}
			}
		} else {
			let field = dir_data[file_name]
			return field
		}
		return false
	}

	async function view_user_contacts() {
		if ( active_user ) {
			let identify = active_identity
			if ( typeof identify.files !== 'object' ) {
				identify.files = {}
			}
			//
			if ( (identify.files.contacts === undefined) || (typeof identify.files.contacts !== 'object') ) {
				let dir_data = await ipfs_profiles.get_dir(identify,false)
				identify.files.contacts = from_dir_data("contacts",dir_data)
			}
			//
			if ( identify ) {
				let contacts_cid = identify.files.contacts.cid
				let c_data = await ipfs_profiles.fetch_contacts(contacts_cid,identify)
				dir_view = JSON.stringify(c_data,null,4)
				dir_view = `
<pre>
	<code>
${dir_view}
	</code>
</pre>
`
			}
		}
	}

	async function view_user_manifest() {
		if ( active_user ) {
			let identify = active_identity
			if ( typeof identify.files !== 'object' ) {
				identify.files = {}
			}
			if ( (identify.files.manifest === undefined) || (typeof identify.files.manifest !== 'object') ) {
				let dir_data = await ipfs_profiles.get_dir(identify,false)
				identify.files.manifest = from_dir_data("manifest",dir_data)
			}
			if ( identify ) {
				let manifest_cid = identify.files.manifest.cid
				let btype = business
				let c_data = await ipfs_profiles.fetch_manifest(manifest_cid,identify,btype)
				dir_view = JSON.stringify(c_data,false,4)
				dir_view = `
<pre>
	<code>
${dir_view}
	</code>
</pre>
`
			}
		}
	}


	async function view_cid_json() {
		if ( j_cid && j_cid.length ) {
			let c_data = await ipfs_profiles.fetch_cid_json(j_cid)
			if ( c_data ) {
				dir_view = JSON.stringify(c_data,false,4)
				dir_view = `
<pre>
	<code>
${dir_view}
	</code>
</pre>`

			} else {
				dir_view = `
<pre>
	<code>
Can't Fetch
	</code>
</pre>`
			}
		}
	}


	async function view_contact_form() {
		let t_cid = man_cid
		if ( t_cid ) {
			let tmplt = await ipfs_profiles.get_contact_template(t_cid)	// we have to get the actaul data, what came in was {name,size,cid}
			if ( tmplt ) {
				dir_view = false
				//
				tmplt.cid = t_cid // 
				manifest_selected_entry.html = utils.clear_char(tmplt.txt_full,'\n')
			}

		}
	}


	//
	async function man_add_contact_form() {
		//
		manifest_obj.custom_contact_forms = manifest_contact_form_list
		//
		let identify = active_identity
		if ( identify ) {
			let act_cid = identify.cid
			ipfs_profiles.dont_store_html(manifest_obj)
			let update_cid = await ipfs_profiles.update_manifest_to_ipfs(identify,business,manifest_obj)
			identify.files.manifest.cid = update_cid
			await update_identity(identify)
		}
		//
	}

	async function man_prefer_contact_form() {
		//
		manifest_obj.custom_contact_forms = manifest_contact_form_list
		manifest_obj.default_contact_form = man_cid
		//
		let identify = active_identity
		if ( identify ) {
			let act_cid = identify.cid
			ipfs_profiles.dont_store_html(manifest_obj)
			let update_cid = await ipfs_profiles.update_manifest_to_ipfs(identify,business,manifest_obj)
			identify.files.manifest.cid = update_cid
			await update_identity(identify)
		}
		//
	}

	async function reset_man_cid(evt) {
		//
		let paste_cid = evt.clipboardData.getData('text/plain')
		//
		let a_contact_form = {
			"info" :  "",
			"cid" : paste_cid,
			"wrapped_key" : "",
			"html" : ""
		}
		//
		let tmplt = await ipfs_profiles.get_contact_template(paste_cid)	// we have to get the actaul data, what came in was {name,size,cid}
		//
		if ( tmplt ) {
			tmplt.cid = paste_cid //
			a_contact_form.info = tmplt.title
			a_contact_form.html = tmplt.txt_full
			//
			man_sel_not_customized = true
			cache_contact_form_vars = tmplt.var_map
					//
			manifest_contact_form_list = manifest_contact_form_list.concat(a_contact_form);
			manifest_index = manifest_contact_form_list.length - 1;
		}
		//
	}

	async function man_update_contact_form() {
		//
		// open up some controls for populating vars, creating security on-offs, etc.
		//
		manifest_selected_entry.info = man_title;
		manifest_selected_entry.cid = man_cid;
		manifest_selected_entry.wrapped_key = man_wrapped_key;
		manifest_selected_entry.html = man_html;
		//
		let identify = active_identity
		if ( identify ) {
			let act_cid = identify.cid
			ipfs_profiles.dont_store_html(manifest_obj)
			let update_cid = await ipfs_profiles.update_manifest_to_ipfs(identify,business,manifest_obj)
			identify.files.manifest.cid = update_cid
			await update_identity(identify)
		}
		//
	}

	async function man_remove_contact_form() {
		// Remove selected person from the source array (people), not the filtered array
		const index = manifest_contact_form_list.indexOf(manifest_selected_entry);
		manifest_contact_form_list = [...manifest_contact_form_list.slice(0, index), ...manifest_contact_form_list.slice(index + 1)];
		manifest_index = Math.min(manifest_index, filtered_manifest_contact_form_list.length - 2);
		//
		manifest_obj.custom_contact_forms = manifest_contact_form_list
		//
		let identify = active_identity
		if ( identify ) {
			let act_cid = identify.cid
			ipfs_profiles.dont_store_html(manifest_obj)
			let update_cid = await ipfs_profiles.update_manifest_to_ipfs(identify,business,manifest_obj)
			identify.files.manifest.cid = update_cid
			await update_identity(identify)
		}
		//
	}

/*
{
	"default_contact_form":false,
	"custom_contact_forms": {
		"default_clear_contact_cid" : {
			"encrypted" :false,
			"preference"  :1,
			"wrapped_key" :false,
			"info" : "default contact form : service provision "
		}
	},
	"sorted_cids":[false],
	"max_preference":1,
	"op_history":[]
}
*/

	async function fetch_manifest(identify) {
		if ( identify && identify.files ) {
			if ( identify.files.manifest ) {
				let manifest_cid = identify.files.manifest.cid
				manifest_obj = await ipfs_profiles.fetch_manifest(manifest_cid,identify)
				if ( manifest_obj.clear_cid === undefined ) {
					manifest_obj.clear_cid = identify.clear_cid
				}
				//
				let m_list = []
				if ( Array.isArray(manifest_obj.custom_contact_forms) ) {
					m_list = manifest_obj.custom_contact_forms
				} else {
					for ( let ky in manifest_obj.custom_contact_forms ) {
						let mm = manifest_obj.custom_contact_forms[ky]
						mm.cid = ky
						m_list.push(mm)
					}
				}
				//
				manifest_contact_form_list = m_list
			}
		}
	}


	function navigate_to_user(e) {
		active = 'User'
	}

</script>

<style>
	* {
		font-family: inherit;
		font-size: inherit;
	}

	.splash-if-you-will {
		font-size: 140%;
		text-align: center;
		line-height: 180%;
		font-weight: 700;
		color:rgb(81, 107, 131);
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}

	.splash-if-you-will span {
		color:rgb(27, 78, 31);
		font-weight: 900;
		font-size: 140%;
		background-color: rgb(255, 254, 238);
		padding: 12px;
		border-radius: 25px;
		font-family: 'Times New Roman', Times, serif;
	}


	.front-page-explain {
		padding: 8px;
		margin-top: 30px;
		color: orangered;
		font-size: 85%;
		font-weight: 500;
		border: solid 1px rgb(45, 99, 45);
		font-family:Georgia, 'Times New Roman', Times, serif;
	}

	blockquote {
		font: 14px/22px normal helvetica, sans-serif;
		margin-top: 10px;
		margin-bottom: 10px;
		margin-left: 50px;
		padding-left: 15px;
		border-left: 3px solid rgb(221, 219, 219);
  	}


	input {
		display: block;
		margin: 0 0 0.5em 0;
	}

	select {
		margin: 0 1em 1em 0;
		width: 14em;
	}

	option {
		cursor: pointer;
	}

	.buttons {
		clear: both;
	}

	.buttons button:disabled {
		color:slategrey;
		border-bottom-color: rgb(233, 237, 240);
		cursor:not-allowed;
	}

	.buttons button {
		background-color:rgb(255, 249, 240);
		font-size:small;
		border-bottom-color: rgb(236, 250, 226);
		border-radius: 6px;
		font-weight: 580;
		font-style: oblique;
	}

	.buttons button:disabled:hover {
		background-color:inherit;
		font-size:small;
		border-bottom-color: rgb(228, 240, 247);
		border-radius: 6px;
		font-weight: 580;
		font-style: oblique;
		cursor:not-allowed;
	}


	.header-button {
		max-width:min-content;
		border-radius: 6px;
		padding: 1px;
		background-color:rgb(248, 250, 248);
	}

	.header-button:hover {
		background-color:rgb(51, 65, 28);
		color:yellow;
	}

	.classy-small {
		background-color:inherit;
		font-size:small;
		border-bottom-color: chartreuse;
		border-radius: 6px;
		font-weight: 580;
		font-style: oblique;
	}


	.long_button {
		width:40%;
	}

	.long_button:disabled {
		color:beige;
	}

	.long_button:disabled:hover{
		color:beige;
		background-color:blanchedalmond;
		cursor:not-allowed;
	}

	.button-header {
		color:rgb(104, 51, 14);
	}

	.button-header:hover {
		color:rgb(15, 92, 34);
		background-color: rgba(242, 242, 210, 0.3);
	}


	.inner_div {
		padding-left: 2px;
		padding-top: 4px;
		border-bottom: 1px lightgray solid;
		min-height: 40px;
	}

	.inner_div label {
		font-size:smaller;
	}


	.top-of-contact {
		margin-bottom: 4px;
		background-color: rgb(252, 249, 240);
		border: cornsilk solid 1px;
		text-align:right;
	}

	.nice_message {
		width: 85%;
		font-size: small;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		color:rgb(54, 81, 99);
		font-weight:600;
		background: -webkit-linear-gradient(to right, white ,rgb(252, 251, 248));
		background: linear-gradient(to right, white, rgb(252, 251, 248) );
	}

	.add-profile-div {
		margin-top:8px;
		border: 1px solid rgb(165, 161, 190);
		padding: 2px;
		background: -webkit-linear-gradient(to right, rgb(252, 251, 240) ,rgb(249, 252, 248));
		background: linear-gradient(to right, rgb(252, 251, 240), rgb(249, 252, 248) );
	}

	.top_instructions {
		padding: 2px;
		color:rgb(66, 33, 13);
		border-bottom: sienna 1px solid;
		font: 0.9em sans-serif;
		font-weight: 600;
		font-style: oblique;
	}


	.team_message {
		background-color: rgb(254, 252, 245);
		border: solid 1px darkblue;
		padding:4px;
		color:rgb(12, 12, 100);
		font-size: 110%;
		height: calc(100vh - 280px);
		overflow: scroll;
	}

	.team_message blockquote {
		width: 85%;
		line-height: 200%;
	}

	.items {
		display: flex;
		flex-wrap: wrap;
		margin-left: 2px;
		margin-top: -10px;
	}

	.items .item {
		flex: 1 0 300px;
		box-sizing: border-box;
		background: -webkit-linear-gradient(to right, rgba(242, 242, 210, 0.3), white);
		background: linear-gradient(to right, rgba(242, 242, 210, 0.3), white );
		color: #171e42;
		padding: 10px;
		margin-left: 2px;
		margin-top: 0px;
	}

	.items {
		padding-left: 5px;
		padding-bottom: 4px;
		padding-right: 12px;
		font-size: 110%;
		font-family: sans-serif;
	}
	
	td, th {
		border : 1px solid rgb(47, 79, 49);
		border-right: none;
		padding : 2px;
		margin : 0px;
	}

	th {
		color :rgb(47, 79, 49);
		font-weight: bolder;
		background-color: seashell;
	}

	table {
		border-right: solid 1px darkslategray;
	}

	.subject {
		font-weight: bold;
	}

	.sender {
		background-color: rgb(255, 255, 255);
		font-weight: 600;
		color:rgb(27, 78, 31);
		padding-left: 4px;
	}


	.tableFixHead {
		overflow-y: auto;
		height: calc(100vh - 200px);
	}
	.tableFixHead thead th {
		position: sticky;
		top: 0;
	}
	table {
		border-collapse: collapse;
		width: 100%;
	}
	th, td {
		padding: 8px 16px;
		border: 1px solid #ccc;
	}
	th {
		background: #eee;
	}

	tr {
		cursor: pointer;
	}

	.tableFixHead option {
		cursor: pointer;
	}


	.user-options {
		background-color: rgb(252, 252, 249);
	}

	.user-options option {
		cursor: pointer;
	}

	.selected_form_link-display {
		margin-top:4px;
		margin-bottom:4px;
		border: solid 1px rgb(13, 48, 20);
		padding:4px;
		background-color: white;
		height:200px;
		overflow:auto;
	}

	#man_cid {
		font-size:smaller;
		min-width:100%;
		font-weight:bold;
	}

	.signup-status {
		color: black;
		background-color: rgb(254, 252, 245);
		font-weight: bold;
		border: solid 1px rgb(13, 48, 20);
		padding:4px;
		height: 60px;
		overflow: auto;
	} 
	.good-status {
		color: green;
	}
	.bad-status {
		color: red;
	}

	.contact_form_list {
		margin-top:4px;
		margin-bottom:4px;
		border: solid 1px navy;
		padding:4px;
		color: darkgreen;
		background-color: rgb(253, 249, 242);
		text-align: center;
	}

	.signup-grid-container {
		display: grid;
		grid-column-gap: 2px;
		grid-row-gap: 2px;
		grid-template-columns: 65% auto;
		background-color: rgb(250, 250, 242);
		padding: 4px;
	}

	.signerupper {
		background-color: rgb(252, 251, 248);
		border: solid 1px rgb(0, 0, 117);
		padding:6px;
	}

	.picture-drop {
		width:90px;
		min-height:90px;
		border: 1px solid navy;
		background-color:rgb(225, 230, 236);
		display:inline-block;
		margin: 2px;
		text-align:center;
		vertical-align: middle;
		cursor:pointer;
	}

	.picture-drop:hover {
		border: 2px dotted rgb(180, 8, 31);
		background-color:rgb(151, 197, 114);
	}

	.picture-drop > .capture_image {
		position:absolute; 
		top:0px; 
		left:0px; 
		z-index:100; 
		width: auto; 
		height: inherit; 
		border:none;
		cursor:pointer;
	}

	.contact_controls {
		width: calc(32vw - 96px);
		margin: 2px;
		border: 1px solid navy;
		display:inline-block;
		background-color: white;
	}

	.contact_controls button {
		border-radius: 8px;
	}

	.manifest-grid-container {
		display: grid;
		grid-column-gap: 2px;
		grid-row-gap: 2px;
		grid-template-columns: 40% auto;
		background-color: rgb(250, 250, 242);
		padding: 4px;
	}

	.manifester {
		background-color: rgb(244, 248, 244);
		border: solid 1px darkblue;
		padding:4px;
	}
	
	.active-tab {
		color: rgb(40, 122, 19);
		background-color: rgb(255, 255, 255);
		font-weight: bolder;
	}

	.plain-tab {
		color: rgb(1, 10, 1);
	}

	.manifest-contact-entry-instruct {
		font-weight: 540;
		font-style:oblique;
		padding-right:3px;
		color:tomato;
		background-color: rgba(235, 225, 235, 0.61);
	}

	.man-default-selected {
		color:rgb(56, 156, 81);
		background-color:rgb(231, 243, 231);
		font-weight: bold;
		border: 1x solid rgb(7, 78, 7);
	}
	.man-default-not-selected {
		color:navy;
	}

	.processed-category {
		font-weight: bold;
		color:rgb(22, 63, 63);
		font-size:larger;
		text-transform:capitalize;
	}

	.cid-grabber {
		font-weight:bolder;
		color:navy;
	}

	.cid-grabber-label {
		font-weight:600;
		color:rgb(50, 148, 50);
		font-style: oblique;
	}

</style>

<div>
	<!--
	  Note: tabs must be unique. (They cannot === each other.)
	-->
	<TabBar tabs={['Identify', 'User', 'Messages', 'Introductions', 'Processed', 'Contacts', 'Manifest', 'About Us']} let:tab bind:active>
	  <!-- Note: the `tab` property is required! -->
	  <Tab {tab}>
		<Label><span class={ (tab === active) ? "active-tab" : "plain-tab"}>{tab}</span></Label>
	  </Tab>
	</TabBar>
  <br>

	{#if (active === 'Identify')}
	<div class="splash-if-you-will" style="height:fit-content" >
		{#if (known_users.length > 0) }
		<div style="height:fit-content">
			The current user is <span>{active_user ? active_user.name : "being created" }</span>.
			<br>
			Not you? Select from the list below or Add yourself with the User tab.
			<div class="user-options" style="text-align:center" >
				<select bind:value={u_index} size={10} style="text-align:center;" on:click={navigate_to_user} >
					{#each known_users as maybe_user, u_index }
						<option value={u_index}>{maybe_user.name}</option>
					{/each}
				</select>	
			</div>
		</div>
		{:else}
		<div class="splash-if-you-will" >
			Please join us in using this way of sending messages.
			<div>
				Click on the <span>User</span> tab.
			</div>
		</div>
		{/if}
		<div class="front-page-explain">
			Pro-mail is like e-mail. 
			<br>
			But, where e-mail is complicated, Pro-mail is simpler.
			<br>
			And, where Pro-mail is more complicated, it's more fun.
			<br>
			No just more fun.
			<br>
			More secure
			<br>
			More customizable.
			<br>
			More Manageable
			<br>
			Easier to Filter and Maintain
		</div>
	</div>
  	{:else if (active === 'User')}
	<div class="signup-grid-container">
		<div class="signerupper">
			<br>
			<div class="top_instructions" >
				Please enter Unique Information about yourself which you would be willing to share with anyone:
			</div>
			<br>
			<div class="inner_div" >
				<label for="name"style="
				display:inline" >Name: </label>
				<input id="name" bind:value={name} placeholder="Name" style="display:inline">
				<input bind:checked={business}  type="checkbox" style="display:inline" ><span>Business (if checked)</span>
			</div>
			<div class="inner_div" >
				{#if business }
					<label for="DOB" style="display:inline" >Year of Inception: </label><input id="DOB" bind:value={DOB} placeholder="Year of Inception" style="display:inline" >
				{:else}
					<label for="DOB" style="display:inline" >DOB: </label><input id="DOB" bind:value={DOB} placeholder="Date of Birth" style="display:inline" >
				{/if}
			</div>
			<div class="inner_div" >
				{#if business }
					<label  for="POO" style="display:inline" >Main Office: </label><input id="POO" bind:value={place_of_origin} placeholder="Main Office" style="display:inline" >
				{:else}
					<label for="POO" style="display:inline" >Place of Origin: </label><input id="POO" bind:value={place_of_origin} placeholder="Place of Origin" style="display:inline" >
				{/if}
			</div>
			<div class="inner_div" >
			<label for="self-text">Cool Public Info</label><br>
			<textarea id="self-text" bind:value={cool_public_info} placeholder="Something you would say to anyone about yourself" />
			</div>
			<div class="add-profile-div" style="text-align:center" >
				{#if creation_to_do }
					<div style = { green ? "background-color:rgba(245,255,250,0.9)" : "background-color:rgba(250,250,250,0.3)" } >
						<button class="long_button" on:click={add_profile} disabled={creator_disabled}>Create my contact profile.</button>
					</div>
				{:else}
					<div style = { green ? "background-color:rgba(245,255,250,0.9)" : "background-color:rgba(250,250,250,0.3)" } >
						<span class="cid-grabber-label">Your custom id number:</span> <span class="cid-grabber">{active_cid}</span>
					</div>
				{/if}
			</div>
			<div class="nice_message">
				<blockquote>
				Enter your information above. This information will be used to make an identifier for sending and receiving messages.
				When you click on the button, "Create my contact profile", your information will go to a gateway server. The gateway server
				will use your information to make an ID, called a CID. This "User" tab, that you are looking at now, will store the CID for you as part of your identity.
				It will also store other information that the server will create for you so that you may begin sending and receiving message between 
				you and your contacts.
				</blockquote>
				<blockquote>
				Your identity will be a structure containing directory and file information and public and private keys.
				<b>This web app uses the structure to store your private information locally in the browser database.</b>
				And, you will be able to download the idenity structure as a JSON obect at any time.
				<b>This JSON structure information will never be sent from the browser by these pages.</b> It will be stored in the bowser database 
				as long as you want.
				</blockquote>
				<blockquote>
				Use the buttons on the right side of the page to create or delete and identity. And, use the <b>Identity</b> buttons,
				with the <i>down</i> triangle ▼ and the <i>up</i> triangle ▲ to download your JSON to disk and to upload your identity, respectively.
				For exampe, you may download your identity to a thumb drive for safe keeping. Or you may upload your identity into another
				browser or restore to a browser if it has been previously deleted.
				</blockquote>
				<blockquote>
				The information you enter above should be unique. For example, I know that my name is shared by at least three other people on the planet,
				all of whom were born in the same year. But, they are from different towns or countries. So, I don't hesitate to enter my place of origin.
				And, I am willing to share my real place of origin with anyone.
				</blockquote>
				<blockquote>
				Some of the public information that you enter, not including keys, may be used later in an API link only if you have interests for which you would be willing to receive unsolicited mail. 
				You may choose the groups or businesses that may publish to topics that you select. You may make selections at a later time. And, the process of managing
				topics will be workable on topics pages separate from these message pages. Topic management will, hopefully, direct most 
				advertisement messaging away from your personal and business messaging.
				</blockquote>
				<blockquote>
				<span style="color:blue;">Note:</span> no information will be sent to any organization as a result of signing up.
				All information, excluding private keys, and your personalized assets such as your contact pages, public and encrypted,
				will be stored in the Interplanetary File System (IPFS). Most of the informaion kept in the IPFS will be encrypted, and will
				only be accessibly by keys stored in your identity. (So, do download your idenity structure an keep it safe between sessions.)
				</blockquote>
			</div>
		</div>
		<div class="signerupper">
			<div class="signup-status">
				status: <span class={signup_status === 'OK' ? "good-status" : "bad-status"}>{signup_status}</span>
			</div>
			<div>
				{#if creation_to_do }
				<div class="picture-drop"  on:drop={drop_biometric} on:dragover={dragover_picture}  >
					<img src={active_profile_biometric} bind:this={biometric_data_el} alt={src_biometric_instruct} />
				</div>
				{/if}
				{#if !creation_to_do }
				<div class="picture-drop"  on:drop={drop_picture} on:dragover={dragover_picture}  >
					<img src={active_profile_image} bind:this={profile_image_el} alt={src_1_name} />
				</div>
				{/if}
				<div>
					<div class="contact_controls">
						<button on:click={clear_identify_form} >∋ new </button>
						<button on:click={remove_identify_seen_in_form} >∌ remove</button>
					</div>	
					<div class="contact_controls">
						<button on:click={app_download_identity} >▼ identity</button>
						<button on:click={app_upload_identity} >▲ identity</button>
					</div>	
				</div>
			</div>
		</div>
	</div>
	{:else if (active === 'Messages')}
		<div>Your Message History</div>
		<div>
			<div class="tableFixHead" >
				<table style="width:100%">
					<thead>
						<tr>
							<th  class="button-header"  style="width:5%">
								<button class="header-button"  on:click={doops_messages}>Op</button>
							</th><th style="width:20%">Date</th><th style="width:30%">Sender</th><th style="width:55%;text-align: left;">Subject</th>
						</tr>
					</thead>
					{#if inbound_contact_messages.length }
						{#each inbound_contact_messages as a_message, c_i }
							<tr on:click={full_message} id="m_contact_{c_i}" class="element-poster"  on:mouseover="{show_subject}">
								<td class="op-select"style="width:5%;text-align:center">
									<input id="doop-m_contact_{c_i}" type="checkbox" on:click={check_box_block}  >
								</td>
								<td class="date"  style="width:20%;text-align:center">{a_message.date}</td>
								<td class="sender"  style="width:30%">{a_message.name}</td>
								<td class="subject" style="width:55%">{@html a_message.subject}</td>
							</tr>
						{/each}
						{/if}
				</table>
			</div>
		</div>
	{:else if active === 'Introductions' }
		<div>Introduction Messages</div>
		<div>
			<div class="tableFixHead" >
				<table style="width:100%">
					<thead>
						<tr>
							<th class="button-header"  style="width:5%">
								<button class="header-button"  on:click={doops_intros}>Op</button>
							</th><th style="width:20%">Date</th><th style="width:30%">Sender</th><th style="width:55%;text-align: left;">Subject</th>
						</tr>
					</thead>
					{#if inbound_solicitation_messages.length }
						{#each inbound_solicitation_messages as a_message, i_i }
							<tr on:click={full_message} id="m_intro_{i_i}" class="element-poster"  on:mouseover="{show_subject}">
								<td class="op-select"style="width:5%;text-align:center">
									<input id="doop-m_intro_{i_i}" type="checkbox"on:click={check_box_block}  >
								</td>
								<td class="date"  style="width:20%;text-align:center">{a_message.date}</td>
								<td class="sender"  style="width:30%">{a_message.name}</td>
								<td class="subject" style="width:60%">{@html a_message.subject}</td>
							</tr>
						{/each}
					{/if}
				</table>
			</div>
		</div>
		{:else if active === 'Processed' }
		<div>
			<span class="processed-category" >{processed_category}</span></div>
		<div>
			<div class="tableFixHead" >
				<table style="width:100%">
					<thead>
						<tr>
							<th class="button-header"  style="width:5%">
								<button class="header-button"  on:click={doops_processed}>Op</button>
							</th><th style="width:20%">Date</th><th style="width:30%">Sender</th><th style="width:55%;text-align: left;">Subject</th>
						</tr>
					</thead>
					{#if processed_messages.length }
						{#each processed_messages as a_message, p_i }
							<tr on:click={full_message} id="m_category_{p_i}" class="element-poster"  on:mouseover="{show_subject}">
								<td class="op-select"style="width:5%;text-align:center">
									<input id="doop-m_category_{p_i}" type="checkbox" on:click={check_box_block}  >
								</td>
								<td class="date"  style="width:20%;text-align:center">{a_message.date}</td>
								<td class="sender"  style="width:30%">{a_message.name}</td>
								<td class="subject" style="width:60%">{@html a_message.subject}</td>
							</tr>
						{/each}
					{/if}
				</table>
			</div>
		</div>
	{:else if (active === 'Contacts')}
	<div class="items">
		<div class="item" >
			<input placeholder="filter prefix" bind:value={prefix}>
			<select bind:value={i} size={5} >
				{#each filteredIndviduals as individual, i}
					<option value={i}  on:click={harmonize_contact_form} >{individual.name}</option>
				{/each}
			</select>
			<div class='buttons'>
				<button class='classy-small' on:click={add_contact} disabled={c_empty_fields}>add</button>
				<button class='classy-small' on:click={update_contact} disabled={!c_name || !selected || cleared_c_form}>update</button>
				<button class='classy-small' on:click={remove_contact} disabled={!selected || cleared_c_form}>delete</button>
			</div>
		</div>
		<div class="item" style="border-top:darkslategrey solid 2px;">
			<div class="top-of-contact">
				<button class="long_button classy-small" on:click={clear_contact_form} >clear form</button>
			</div>
			<div class="inner_div" >
				<label for="name"style="display:inline" >Name: </label>
				<input id="name" bind:value={c_name} placeholder="Name" style="display:inline">
				<input bind:checked={c_business}  type="checkbox" style="display:inline">
				{#if c_business }
					<span>Business</span>
				{:else}
					<span>Person</span>
				{/if}
			</div>
			<div class="inner_div" >
				{#if c_business }
					<label for="DOB" style="display:inline" >Year of Inception: </label><input id="DOB" bind:value={c_DOB} placeholder="Year of Inception" style="display:inline" >
				{:else}
					<label for="DOB" style="display:inline" >DOB: </label><input id="DOB" bind:value={c_DOB} placeholder="Date of Birth" style="display:inline" >
				{/if}
			</div>
			<div class="inner_div" >
				{#if c_business }
					<label  for="POO" style="display:inline" >Main Office: </label><input id="POO" bind:value={c_place_of_origin} placeholder="Main Office" style="display:inline" >
				{:else}
					<label for="POO" style="display:inline" >Place of Origin: </label><input id="POO" bind:value={c_place_of_origin} placeholder="Place of Origin" style="display:inline" >
				{/if}
			</div>
			<div class="inner_div" >
			<label for="self-text">Cool Public Info</label><br>
			<textarea id="self-text" bind:value={c_cool_public_info} placeholder="Copy info given to you by your new contact" />
			</div>
			<div class="inner_div" >
				<label for="CID" style="display:inline;font-size:smaller" >CID: </label><input id="CID" bind:value={c_cid} placeholder="cid" style="display:inline;width:70%" disabled >
				<label for="PK" style="display:inline;font-size:smaller" >PK</label>
				<input id="PK" type="checkbox" style="display:inline" checked={(c_public_key && (c_public_key.length > 0))} disabled >
			</div>
		</div>
		<div class="item"  style="border-top:darkslategrey solid 2px;" >
			<span class="top_instructions" >Compose a new message for:</span> {c_name}
			<br><br>
			<button class="long_button" on:click={pop_editor}>compose</button>
		</div>
	</div>
	{:else if (active === 'Manifest') }
	<div>
		<blockquote>
			The manifest is your list of custom contact forms. 
			When you send a message to someone, you may send them a link to one of your contact forms that will best handle 
			the way that your contact might respond to you. Use the tools here to manage your collection of contact forms.
		</blockquote>
		<div class="manifest-grid-container" >
			<div class="manifester">
				<div  style="display:block" >
					<div style="display:inline;float:left">
						<input placeholder="filter prefix" bind:value={man_prefix}>
						<select bind:value={manifest_index} size={5}>
							{#each filtered_manifest_contact_form_list as contact_item, manifest_index}
								<option value={manifest_index}>{contact_item.info}</option>
							{/each}
						</select>
					</div>
					<div class='buttons' style="display:inline;float:clear" >
						<button on:click={view_user_dir} >directory</button>
						<button on:click={view_user_contacts} >contacts file</button>
						<button on:click={view_user_manifest} >manifest file</button>
						<button on:click={view_contact_form} >view contact form</button>
						<button on:click={view_cid_json} >view json from cid</button>
					</div>
				</div>
				<div class="inner_div" style="background-color:beige;border:solid 1px grey" >
					<div style="height:fit-content" >
						<div class="manifest-contact-entry-instruct" >
							Use the contact form explorer "Contact Template Management" to find IPFS Links to enter in the field below.
						</div>
						<label for="man_cid"style="display:inline" >Manifest IPFS Link: </label>
						<input id="man_cid" bind:value={man_cid} placeholder="cid" style="display:inline" on:paste={reset_man_cid} >
					</div>
					<div class='buttons'>
						<button on:click={man_add_contact_form} disabled="{!man_title}">sync</button>
						<button class={man_contact_is_default ?  "man-default-selected" : "man-default-not-selected"} on:click={man_prefer_contact_form} disabled="{!man_title}">
							{#if man_contact_is_default }
								default
							{:else}
								set default
							{/if}
						</button>
						<button on:click={man_remove_contact_form} disabled="{!manifest_selected_entry}">delete</button>
						<button on:click={man_update_contact_form} disabled="{!man_title || !manifest_selected_entry}">customize</button>
					</div>	
				</div>
				<div class="inner_div" >
					<div style="background-color:beige;border-bottom: darkgreen 1px solid;margin-bottom: 4px;">
						<label for="preference"style="display:inline" >Max Preference All Forms: </label>
						<input id="preference" bind:value={man_max_preference} placeholder="Preference Number" style="display:inline" disabled >	
					</div>
					<label for="name"style="display:inline" >Name: </label>
					<input id="name" bind:value={man_title} placeholder="Name" style="display:inline" disabled={man_sel_not_customized}>
					<br>
					<label for="man_sel_pref" >Selected Form Preference: </label>
					<input id="man_sel_pref" bind:value={man_preference} placeholder="1.0" style="display:inline" >
					<div>
						<label for="man_sel_pref" >Wrapped Key: </label><br>
						<textarea id="man_contact_key" bind:value={man_wrapped_key} style="display:inline" disabled />
						<label for="man_contact_enc" >encrypted</label>
						<input id="man_contact_enc" type="checkbox" checked={man_encrypted ? true : false } style="display:inline" disabled />
					</div>
				
				</div>
			</div>
			{#if (dir_view !== false) }
				<div class="manifester">
					{@html dir_view}
				</div>
			{:else if manifest_selected_form }
				<div class="manifester">
					{@html manifest_selected_form}
				</div>
			{:else}
				<div class="manifester">
					No form defined.
				</div>
			{/if}
		</div>
		<div style="height:fit-content" >
			<label for="j_cid" style="display:inline" >CID For JSON File: </label>
			<input id="j_cid" bind:value={j_cid} placeholder="cid" style="display:inline" >
		</div>

	</div>
	{:else if (active === 'About Us') }
	<div  class="team_message" >
		<blockquote>
		This service is free. It is a way for you to set up messaging with other people.
		It is like email, but it offers an alernative ways of running your message process.
		</blockquote>
		<blockquote>
		For one, there is no email service associated with this way of handling messages. 
		All messages and interfaces for interacting with the processes are stored on the InterPlanetary File System.
		</blockquote>
		<blockquote>
		Your contact pages is stored there. This tool makes the contact page and stores it for you. Then when someone wants to send 
		you a message, they access your contact page. The person who sends you a message will write a message on your page and click send.
		The contact page you use will send a message service that is baked into the contact page.
		</blockquote>
		<blockquote>
		This tool, makes and stores the kind of contact page you want to store. So, by selecting the type of contact page, you will also be selecting 
		how you want to communicate. You also get to select your style of contact page. Maybe you want to have your picture on it, maybe not.
		Depending on the community of contact page makers, you may find different styles. Each style is part of a template. And, you select the template.
		</blockquote>
		<blockquote>
		<span style="font-weight: bold;">How to get the word out about your page?</span> You are probably used to handing out a business card with your email on it.
		But, instead of that, you can hand out the link to your contact page. The actual link that you receive when you sign up might be hard to read. 
		But, you can give out the contents of the fields that you entered in order to make your contact page. 
		</blockquote>
		<blockquote>
		The reason we have asked for information you might tell anyone is that we are asking for information you want to share. This information should identify you,
		but not give away secrets. When someone sends a message, we can find your contact page by reprocessing the same information.
		</blockquote>
		<blockquote>
		If you don't want to print you contact information on your business card, you can always just give out the hash code.
		But, keep in mind, your contacts will have to type it.
		</blockquote>
		<blockquote>
		Now, you can store contact information in your list of contacts. Each of these links will find the contact page.
		</blockquote>
		<blockquote>
		Now about getting unsoliceted mail or blog feeds from organizations. For these you get a separate number. Messages being sent through a messaging service will use
		an API link to send messages to the agreed upon topic (the topic you tell the organization that they can bug you about.) You can use your topic dashbaord to 
		select the latest news from organization you care about. 
		</blockquote>
		<blockquote>
		Messages from contacts will show up in your mail stream (promail). Find links to that on your management dashboard (also generated by when you sign up.)
		To help you find your information when you go back to your browser, the information you enter on signing up will be stored in your broswer's database (indexedDb).
		If you switch browsers, you can always enter your information again, and click "restore". You will also find an option to remove your information from your browser.
		</blockquote>
	</div>
	{/if}
  </div>

<FloatWindow title={message_selected.name} scale_size_array={all_window_scales} index={0} use_smoke={false}>
	<MessageDisplay {...message_selected} on:message={handle_message} />
</FloatWindow>

<!---->
{#if selected !== undefined }
<FloatWindow title={selected.name} scale_size_array={all_window_scales} index={1} use_smoke={false}>
	<MessageEditor {...selected} reply_to={message_selected} from_contact={message_edit_from_contact}
									active_identity={active_identity}
									cc_list={filtered_cc_list}
									contact_form_list={filtered_manifest_contact_form_list}/>
</FloatWindow>
{/if}

<FloatWindow title={message_edit_list_name} scale_size_array={all_window_scales} index={2} use_smoke={false}>
	<MessageListEdit message_edit_type="Message Ops" active_identity={active_identity} on:message={handle_message} />
</FloatWindow>

