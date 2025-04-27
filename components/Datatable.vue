<template>
	<div>
		<div class="my-2 text-center">
			<div v-if="scopes.length > 0" class="btn-group" role="group">
				<input id="scope" v-model="scope" name="scope" type="radio" class="btn-check" autocomplete="off" value="all" checked />
				<label class="btn btn-outline-primary" for="scope">All</label>

				<template v-for="(item, i) in scopes" :key="item">
					<input :id="`scope-${i}`" v-model="scope" name="scope" type="radio" class="btn-check" autocomplete="off" :value="item" />
					<label class="btn btn-outline-primary text-capitalize" :for="`scope-${i}`">{{ item }}</label>
				</template>
			</div>
		</div>
		<table ref="view" class="table border border-2 border-left-0 border-right-0 border-top border-bottom w-100">
			<thead v-if="showHeader">
				<slot name="header" />
			</thead>
			<tbody>
				<slot name="body" />
			</tbody>
			<tfoot v-if="showFooter" class="">
				<slot name="footer" />
			</tfoot>
		</table>
	</div>
</template>
<script lang="ts">
// @ts-nocheck
import { AxiosError } from 'axios'

import $ from 'jquery'
import 'jszip'
import 'pdfmake'

import DataTable, { Api, Config } from 'datatables.net-bs5'

import 'datatables.net-buttons-bs5'
import 'datatables.net-buttons/js/buttons.colVis.mjs'
import 'datatables.net-buttons/js/buttons.html5.mjs'
import 'datatables.net-buttons/js/buttons.print.mjs'
import 'datatables.net-fixedcolumns-bs5'
import 'datatables.net-fixedheader-bs5'
import 'datatables.net-responsive-bs5'
//import "datatables.net-scroller-bs5"
import 'datatables.net-searchbuilder-bs5'
import 'datatables.net-searchpanes-bs5'
import 'datatables.net-select-bs5'

// import "datatables.net-autofill-bs5"
// import "datatables.net-colreorder-bs5"
import 'datatables.net-datetime'
// import "datatables.net-keytable-bs5"
// import "datatables.net-rowgroup-bs5"
// import "datatables.net-rowreorder-bs5"

import { merge } from 'lodash'

import Swal from 'sweetalert2'
import { Component, Prop, Ref, Vue, Watch, toNative } from 'vue-facing-decorator'

@Component({})
class Datatable extends Vue {
	// eslint-disable-next-line no-undef
	datatable!: Api<HTMLTableElement>
	editor!: any //typeof Editor.Api<HTMLTableElement>

	scope = 'all'

	@Watch('scope')
	onScopeChange(value) {
		this.datatable.draw()
	}

	@Ref('view')
	readonly view!: HTMLTableElement

	@Prop({ type: Object, default: () => {} })
	readonly options!: Config

	@Prop({ type: Object, default: () => {} })
	readonly editorOptions!: object

	@Prop({ type: Array, default: () => [] })
	readonly scopes!: string[]

	get showHeader() {
		return !!this.$slots.header
	}

	get showFooter() {
		return !!this.$slots.footer
	}

	deleteRow(data: object, force = false) {
		//this.datatable.processing(true)
		this.$http
			.delete(`${this.datatable.ajax.url()}/editor`, { params: { id: data.id, force } })
			.then(() => this.datatable.draw())
			.catch((e: AxiosError) => console.error(e.response.data.message))
		//.finally(() => this.datatable.processing(false))
	}

	destroyed() {
		//this.datatable.
	}

	created() {
		this.options.columns.forEach((c) => (c.footer = c.title))
		//this.options.data.scope = this.scope
	}

	mounted() {
		// @ts-ignore
		this.datatable = new DataTable(this.view, this.options)
		$(() => {
			//this.editor = new Editor(this.view, this.editorOptions)
			$('.dt-search input').removeClass('form-control-sm')
			$('.dt-length select').removeClass('form-select-sm')
			$('.dataTable').addClass('table table-responsive table-bordered')

			$('.dt-search button').on('click', (e) => {
				e.preventDefault()

				const search = $('.dt-search input').val() as string

				if (search.length > 0) {
					this.datatable.search(search).draw()
				}
			})
		})

		document.onkeyup = (e) => {
			if (e.code === 'Delete') {
				const rows = this.datatable.rows({ selected: true })
				for (let i = 0; i < rows.count(); i++) {
					this.deleteRow(rows.data()[i])
				}
			}
		}

		window.onresize = () => this.datatable.responsive.recalc()

		this.datatable.on('preXhr.dt', (e, settings, data) => (data.scope = this.scope))

		this.datatable.on('click', '.inertia-link', (e) => {
			e.preventDefault()
			this.$router.visit((e.currentTarget as HTMLAnchorElement).href)
		})

		this.datatable.on('click', '.delete, .restore', ({ target }: { target: HTMLAnchorElement }) => {
			this.$sweet
				.fire({
					title: 'Are You Sure?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'YES',
				})
				.then((result) => {
					if (result.isConfirmed) {
						const row = this.datatable.row($(target).parents('tr'))
						const data = row.data()
						this.deleteRow(data)
					}
				})
		})

		this.datatable.on('click', '.clear', ({ target }: { target: HTMLAnchorElement }) => {
			const row = this.datatable.row($(target).parents('tr'))
			const data = row.data()
			this.$sweet
				.fire({
					title: 'Are You Sure?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'YES',
				})
				.then((result) => {
					if (result.isConfirmed) {
						this.deleteRow(data, true)
						Swal.fire('Cleared!', 'Your record has been cleared from the database.', 'success')
					}
				})
		})

		this.datatable.on('click', '.action', ({ target }: { target: HTMLAnchorElement }) => {
			const data = this.datatable.row($(target).parents('tr')).data()
			const path = $(target).data('path')
			this.$http.post(this.route(path, {}))
		})
		DataTable.ext.errMode = 'throw'
	}
}

export default toNative(Datatable)

$.fn.dataTable.Api.register('processing()', function (show) {
	return this.iterator('table', function (ctx) {
		ctx.oApi._fnProcessingDisplay(ctx, show)
	})
})

$.extend($.fn.dataTable.defaults, {
	search: {
		return: true,
	},
	//scrollY: 800,
	deferRender: true,
	scroller: true,
	searching: true,
	ordering: true,
	destroy: true,
	processing: true,
	responsive: true,
	serverSide: true,
	//stateSave: true,
	stateDuration: 60 * 60 * 24,
	autoWidth: true,
	//fixedHeader: true,
	lengthMenu: [10, 20, 50, 100],
	language: {
		info: '<span class="d-block">Showing <b>_START_ to _END_</b> of _TOTAL_ entries</span>',
		infoEmpty: '<span class="d-block">Showing <b>0 to 0 of 0</b></span>',
		lengthMenu: '<div class="input-group">_MENU_<span class="input-group-text"><i class="fas fa-eye"></i></span></div>',
		processing: '<div class="pt-3"><span class"text-center">Processing...</span></div>',
		search: '<div class="input-group">_INPUT_<button class="btn btn-light me-2" title="search" type="button"><i class="fas fa-search"></i></button></div>',
		searchPlaceholder: 'Search...',
		loadingRecords: 'Please wait - loading...',
		paginate: {
			next: "<i class='fas fa-angle-right'></i>",
			previous: "<i class='fas fa-angle-left'></i>",
			first: "<i class='fas fa-angles-left'></i>",
			last: "<i class='fas fa-angles-right'></i>",
		},
		searchBuilder: {
			button: '<i class="fas fa-search"></i>',
		},
		searchPanes: {
			collapse: '<i class="fas fa-filter"></i>',
		},
	},
	// dom: "<'row table-head gy-1' <'col-md-4 col-12 d-flex justify-content-md-start justify-content-center' B>" +
	//     "<'col-md-8 col-12 d-flex justify-content-md-end justify-content-center' f l>>" +
	//     "<'row table-body my-1' <'col-12' <'table-indicator' r> t>>" +
	//     "<'row table-foot gy-' <'col-md-6 col-12 d-flex justify-content-md-start justify-content-center' i>" +
	//     "<'col-md-6 col-12 d-flex justify-content-md-end justify-content-center' p>>",
	layout: {
		//top1: 'searchBuilder',
		topStart: 'buttons',
		topEnd: ['search', 'pageLength'],
		bottomStart: 'info',
		bottomEnd: 'paging',
	},
	rowId: 'id',
	select: {
		style: 'os',
		selector: 'td:not(:last-child)',
		blurable: true,
	},
	ajax: {
		data: (data, settings) => {
			let api = new DataTable.Api(settings)
			data.columns.push({
				data: 'slug',
			})
			return merge(data, {
				trash: false,
				orderable: api.order().length > 0,
				scope: 'all',
			})
		},
		method: 'POST',
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
			XDEBUG_SESSION: 'vsc',
		},
	},
	columnDefs: [
		{
			targets: '_all',
			orderable: false,
			searchable: false,
			class: 'align-middle',
			width: '20px',
			defaultContent: '<i>N/A</i>',
			//type: 'num',
			// searchBuilder: {
			//     defaultCondition: '='
			// },
			//searchBuilderType: 'num'
		},
	],
})

$.extend(true, DataTable.Buttons.defaults, {
	dom: {
		container: {
			tag: 'div',
			className: 'dt-buttons',
		},
	},
})

$.fn.dataTable.ext.buttons.refresh = {
	text: '<i class="fas fa-sync-alt"></i>',
	titleAttr: 'Refresh Table Information',
	action: (_e, table) => table.ajax.reload(),
	attr: {
		'data-toggle': 'tooltip',
	},
}

$.fn.dataTable.ext.buttons.create = {
	text: '<i class="fa fa-plus"></i>',
	tag: 'a',
	titleAttr: 'Create',
	action: '',
	init: (_dt, node) => {
		node.off('click')
	},
}

$.fn.dataTable.ext.buttons.export = {
	text: '<i class="fas fa-cloud-download-alt"></i>',
	extend: 'collection',
	autoClose: true,
	titleAttr: 'Export Table Information',
	buttons: ['copy', 'excel', 'csv', 'pdf', 'print'],
}

$.fn.dataTable.ext.buttons.select = {
	extend: 'collection',
	text: '<i class="fas fa-check-square"></i>',
	className: 'btn-warning',
	autoClose: true,
	titleAttr: 'Select Table Information',
	buttons: [
		{
			extend: 'selectAll',
			text: 'Select All',
			titleAttr: 'Select All',
		},
		{
			extend: 'selectNone',
			text: 'Select None',
			titleAttr: 'Select None',
		},
	],
}
$.fn.dataTable.ext.buttons.delete = {
	text: '<i class="fas fa-trash"></i>',
	extend: 'remove',
	titleAttr: 'Delete Selected Rows Data',
}

$.fn.dataTable.ext.buttons.filter = {
	text: '<i class="fas fa-filter"></i>',
	extend: 'collection',
	autoClose: true,
	value: null,
	buttons: [],
	init: (dt, node, config) => {
		dt.on('preXhr', (_e, _settings, data) => (data.filter = { type: config?.filter }))
		dt.on('xhr', (_e, _settings, { categories }) => {
			let buttons = []
			buttons = categories.map((item) => ({ text: item.title, action: () => dt.on('preXhr', (_e, _settings, data) => (data.filter.value = item.id)).draw() }))
			buttons.unshift('<hr />')
			buttons.unshift({ text: 'All', action: () => dt.on('preXhr', (_e, _settings, data) => (data.filter.value = null)).draw() })
			dt.button(null, node).collectionRebuild(buttons)
		})
	},
}

$.fn.dataTable.ext.buttons.trashed = {
	text: '<i class="fas fa-trash-can"></i>',
	titleAttr: 'Thrashed',
	action: (_e, dt, node) => {
		let { trash } = dt.ajax.params()
		if (trash) {
			dt.on('preXhr', (_e, _settings, data) => (data.trash = false)).draw()
			dt.button(0, node).text('<i class="fas fa-trash"></i>')
		} else {
			dt.on('preXhr', (_e, _settings, data) => (data.trash = true)).draw()
			dt.button(0, node).text('<i class="fas fa-trash-restore"></i>')
		}
	},
}

/* $.extend(true, $.fn.dataTable.Editor.defaults, {
        ajax: {
            remove: {
                method: 'DELETE',
                error: (xhr) => console.error(xhr.response),
                success: (response) => console.log(response),
            },
            edit: {
                method: 'PUT',
                error: (xhr) => console.error(xhr.response),
                success: (response) => console.log(response),
            },
        },
        table: '#table',
        idSrc: 'id',
    }) */

$(() => {
	//$('.btn-toolbar .btn').button('toggle')
	$('.filter input, .trash input').on('change', (e) => {
		let table = $(e.target).parents('.btn-toolbar').first().data('table')
		$(table).DataTable().ajax.reload()
	})
})

//})
</script>

<style lang="scss">
@import 'datatables.net-bs5/css/dataTables.bootstrap5.css';
//@import 'datatables.net-autofill-bs5/css/autoFill.bootstrap5.css';
@import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.css';
//@import 'datatables.net-colreorder-bs5/css/colReorder.bootstrap5.css';
@import 'datatables.net-datetime/css/dataTables.dateTime';
@import 'datatables.net-fixedcolumns-bs5/css/fixedColumns.bootstrap5.css';
@import 'datatables.net-fixedheader-bs5/css/fixedHeader.bootstrap5.css';
//@import 'datatables.net-keytable-bs5/css/keyTable.bootstrap5.css';
@import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.css';
//@import 'datatables.net-rowgroup-bs5/css/rowGroup.bootstrap5.css';
//@import 'datatables.net-rowreorder-bs5/css/rowReorder.bootstrap5.css';
@import 'datatables.net-scroller-bs5/css/scroller.bootstrap5.css';
@import 'datatables.net-searchbuilder-bs5/css/searchBuilder.bootstrap5.css';
@import 'datatables.net-searchpanes-bs5/css/searchPanes.bootstrap5.css';
@import 'datatables.net-select-bs5/css/select.bootstrap5.css';
@import 'datatables.net-staterestore-bs5/css/stateRestore.bootstrap5.css';
//@import '@/vendor/editor/css/editor.dataTables.bootstrap.css';

.dataTable {
	width: 100% !important;

	.avatar {
		max-width: 70px !important;
	}
}

.dt-info,
.dt-search,
.dt-length,
.dt-paging {
	width: fit-content;
}

.dt-search,
.dt-length {
	display: inline-block;
}

.dt-length select {
	margin-right: 0 !important;
}

.dt-info {
	padding-top: 0 !important;
}

.dt-column-title {
	text-transform: uppercase !important;
	font-size: 0.875rem;
}
</style>
