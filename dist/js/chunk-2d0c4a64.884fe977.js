(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c4a64"],{"3c75":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("v-card",[i("v-card-title",[e._v(" Gestão de permissões ")]),i("v-divider",{staticClass:"mt-4"}),i("v-card-text",{staticClass:"d-flex align-center flex-wrap pb-0"},[i("v-text-field",{staticClass:"user-search me-3 mb-4",attrs:{placeholder:"Pesquisar",outlined:"","hide-details":"",dense:""},model:{value:e.searchQuery,callback:function(t){e.searchQuery=t},expression:"searchQuery"}}),i("v-spacer"),i("div",{staticClass:"d-flex align-center flex-wrap"},[i("v-btn",{staticClass:"mb-4 me-3",attrs:{color:"primary"},on:{click:function(t){return t.stopPropagation(),e.insert()}}},[i("v-icon",[e._v(e._s(e.icons.mdiPlus))]),i("span",[e._v("Nova permissão")])],1),i("v-menu",{attrs:{bottom:"",left:""},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on,s=t.attrs;return[i("v-btn",e._g(e._b({staticClass:"mb-4",attrs:{color:"secondary",outlined:""}},"v-btn",s,!1),a),[i("v-icon",{staticClass:"me-1",attrs:{size:"17"}},[e._v(" "+e._s(e.icons.mdiExportVariant)+" ")]),i("span",[e._v("Exportar")])],1)]}}])},[i("v-list",[i("v-list-item",[i("v-list-item-title",[i("v-icon",{staticClass:"me-2",attrs:{size:"20"}},[e._v(" "+e._s(e.icons.mdiFilePdfBox)+" ")]),i("span",[e._v("PDF")])],1)],1),i("v-list-item",[i("v-list-item-title",[i("v-icon",{staticClass:"me-2",attrs:{size:"20"}},[e._v(" "+e._s(e.icons.mdiFileExcel)+" ")]),i("span",[e._v("Excel")])],1)],1)],1)],1)],1)],1),i("v-data-table",{attrs:{headers:e.tableColumns,items:e.itemsListTable,"server-items-length":e.totalItemsListTable,loading:e.loading,"show-select":""},scopedSlots:e._u([{key:"item.created_at",fn:function(t){var a=t.item;return[i("span",[e._v(e._s(e._f("dateTimeFormatBr")(a.created_at)))])]}},{key:"item.updated_at",fn:function(t){var a=t.item;return[i("span",[e._v(e._s(e._f("dateTimeFormatBr")(a.created_at)))])]}},{key:"item.actions",fn:function(t){var a=t.item;return[i("v-menu",{attrs:{bottom:"",left:""},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on,s=t.attrs;return[i("v-btn",e._g(e._b({attrs:{icon:""}},"v-btn",s,!1),a),[i("v-icon",[e._v(e._s(e.icons.mdiDotsVertical))])],1)]}}],null,!0)},[i("v-list",[i("v-list-item",{on:{click:function(t){return t.stopPropagation(),e.edit(a)}}},[i("v-list-item-title",[i("v-icon",{staticClass:"me-2",attrs:{size:"20"}},[e._v(" "+e._s(e.icons.mdiPencilOutline)+" ")]),i("span",[e._v("Editar")])],1)],1),i("v-list-item",{on:{click:function(t){return e.remover(a)}}},[i("v-list-item-title",[i("v-icon",{staticClass:"me-2",attrs:{size:"20"}},[e._v(" "+e._s(e.icons.mdiDeleteOutline)+" ")]),i("span",[e._v("Delete")])],1)],1)],1)],1)]}}],null,!0),model:{value:e.selectedRows,callback:function(t){e.selectedRows=t},expression:"selectedRows"}})],1),i("v-navigation-drawer",{attrs:{value:e.isAddItem,temporary:"",touchless:"",right:!e.$vuetify.rtl,width:e.$vuetify.breakpoint.smAndUp?350:"100%",app:""}},[i("v-card",{attrs:{height:"100%"}},[i("div",{staticClass:"drawer-header d-flex align-center mb-4"},[i("span",{staticClass:"font-weight-semibold text-base text--primary"},[e._v(e._s(e.indexEdicao?"Editar "+e.formTitle:"Cadastrar "+e.formTitle)+" ")]),i("v-spacer"),i("v-btn",{attrs:{icon:"",small:""},on:{click:function(t){return e.closeModal()}}},[i("v-icon",{attrs:{size:"22"}},[e._v(" "+e._s(e.icons.mdiClose)+" ")])],1)],1),i("v-card-text",[i("v-form",{ref:"form",on:{submit:function(t){return t.preventDefault(),e.onSubmit.apply(null,arguments)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-12"},[i("v-text-field",{attrs:{rules:[e.validators.required],outlined:"",dense:"",label:"Nome","hide-details":"auto","data-vv-as":"Nome"},model:{value:e.item.name,callback:function(t){e.$set(e.item,"name",t)},expression:"item.name"}})],1),i("div",{staticClass:"col-6"},[i("v-btn",{staticClass:"me-3",attrs:{color:"primary",type:"submit"}},[e._v(" Adicionar ")])],1),i("div",{staticClass:"col-6"},[i("v-btn",{attrs:{color:"secondary",outlined:"",type:"reset"},on:{click:function(t){return e.closeModal()}}},[e._v(" Fechar ")])],1)])])],1)],1)],1),i("v-row",{attrs:{justify:"center"}},[i("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:e.dialogRemove,callback:function(t){e.dialogRemove=t},expression:"dialogRemove"}},[i("v-card",[i("v-card-title",{staticClass:"text-h5"},[e._v(" Deseja realmente remover este item ? ")]),i("v-card-text",[e._v("Todas informações serão removidas da base de dados.")]),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"secondary"},on:{click:function(t){return e.closeModalRemover()}}},[e._v(" Fechar ")]),i("v-btn",{attrs:{color:"error"},on:{click:function(t){return e.removerItem()}}},[e._v(" Apagar ")])],1)],1)],1)],1)],1)},s=[],n=i("ade3"),o=i("b1f8"),r=(i("b0c0"),i("4360")),c=i("94ed"),l=i("ed09"),d=(i("d3b7"),i("be3b")),m={namespaced:!0,state:{itemsList:[],permissionsList:[],item:[],indexEdicao:!1},getters:{getItemsList:function(e){return e.itemsList},getPermissionsList:function(e){return e.permissionsList},getItem:function(e){return e.item},getIndexEdicao:function(e){return e.indexEdicao}},mutations:{setItemList:function(e,t){e.itemsList=t},setPermissionsList:function(e,t){e.permissionsList=t},setItem:function(e,t){e.item=t},setIndexEdicao:function(e,t){e.indexEdicao=t}},actions:{fetchItems:function(e){return new Promise((function(e,t){d["a"].get("/v1/acl/permission").then((function(t){return e(t)}))["catch"]((function(e){return t(e)}))}))},fetchItem:function(e,t){var i=t.id;return new Promise((function(e,t){d["a"].get("/v1/acl/permission/".concat(i)).then((function(t){return e(t)}))["catch"]((function(e){return t(e)}))}))},addItem:function(e,t){return new Promise((function(e,i){d["a"].post("/v1/acl/permission",t).then((function(t){return e(t)}))["catch"]((function(e){return i(e)}))}))},editItem:function(e,t){var i=t.id,a=t.dados;return new Promise((function(e,t){d["a"].put("/v1/acl/permission/".concat(i),a).then((function(t){return e(t)}))["catch"]((function(e){return t(e)}))}))},removeItem:function(e,t){return new Promise((function(e,i){d["a"]["delete"]("/v1/acl/permission/".concat(t)).then((function(t){return e(t)}))["catch"]((function(e){return i(e)}))}))}}},u=i("1da1");i("96cf");function v(){var e=Object(l["J"])([]),t=[{text:"NOME",value:"name"},{text:"GUARD",value:"guard_name"},{text:"DATA CADASTRO",value:"created_at"},{text:"DATA ATUALIZAÇÃO",value:"updated_at"},{text:"AÇÕES",value:"actions",align:"center",sortable:!1}],i=Object(l["J"])(""),a=Object(l["J"])(0),s=Object(l["J"])(!1),n=Object(l["J"])({sortBy:["id"],sortDesc:[!0]}),o=Object(l["J"])([]),c=Object(l["J"])([]),d=function(){r["a"].dispatch("app-permissoes/fetchItems").then((function(t){var i=t.data.data;r["a"].commit("app-permissoes/setPermissionsList",i.permissions),e.value=i.permissions,a.value=i.permissions.length,o.value=i.permissions.length,s.value=!1}))["catch"]((function(e){console.log(e)}))};return Object(l["A"])(Object(u["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:d();case 1:case"end":return e.stop()}}),e)})))),{itemsListTable:e,tableColumns:t,searchQuery:i,totalItemsListTable:a,loading:s,options:n,itemsTotalLocal:o,selectedRows:c,fetchItems:d}}var f=i("7f98"),p={name:"Gestao-permissoes",setup:function(){var e,t="app-permissoes";r["a"].hasModule(t)||r["a"].registerModule(t,m),Object(l["D"])((function(){r["a"].hasModule(t)&&r["a"].unregisterModule(t)}));var i=Object(l["J"])(!1),a=Object(l["H"])({}),s=Object(l["J"])(!1),d=Object(l["J"])(null),u=Object(l["J"])({name:""}),p=Object(l["J"])(!1),b=Object(l["J"])(!1),h=v(),x=h.itemsListTable,_=h.tableColumns,g=h.searchQuery,O=h.totalItemsListTable,I=h.loading,w=h.options,C=h.selectedRows,j=h.fetchItems,k=Object(l["b"])((function(){return!1===i||!0===i?"permissão":void 0}));function y(){this.indexEdicao=!1,this.isAddItem=!this.isAddItem}function A(e){this.itemData=e,this.indexEdicao=!this.indexEdicao,this.item=e,this.isAddItem=!this.isAddItem}function E(e){this.itemData=e,this.dialogRemove=!0}function L(){var e=this;r["a"].dispatch("app-permissoes/removerItem",this.itemData.id).then((function(){e.dialogRemove=!1,r["a"].dispatch("module/openSnackBar",{color:"success",timeout:1e4,text:"Papel removido com sucesso."})}))}function D(){this.itemData=[],this.dialogRemove=!1}function T(){u.value=[],r["a"].commit("app-permissoes/setIndexEdicao",!1),Object(o["a"])("isAddItem")}var V=function(){d.value.validate()},P=function(){if(s.value){var e={name:u.value.name};i.value?r["a"].dispatch("app-permissoes/editItem",{id:u.value.id,dados:e}).then((function(){r["a"].dispatch("module/openSnackBar",{color:"success",timeout:1e4,text:"Item atualizado com sucesso."})})):r["a"].dispatch("app-permissoes/addItem",e).then((function(){r["a"].dispatch("module/openSnackBar",{color:"success",timeout:1e4,text:"Item salvo com sucesso."})})),T()}else V()};return e={itemsListTable:x,tableColumns:_,searchQuery:g,totalItemsListTable:O,loading:I,options:w,isAddItem:b,selectedRows:C,formTitle:k,itemData:a,indexEdicao:i,fetchItems:j,edit:A,insert:y,remover:E,removerItem:L,closeModalRemover:D,closeModal:T,valid:s,validate:V,form:d,onSubmit:P,dialogRemove:p,item:u},Object(n["a"])(e,"valid",s),Object(n["a"])(e,"validate",V),Object(n["a"])(e,"indexEdicao",i),Object(n["a"])(e,"validators",{required:f["a"]}),Object(n["a"])(e,"icons",{mdiSquareEditOutline:c["P"],mdiFileDocumentOutline:c["v"],mdiDotsVertical:c["p"],mdiDeleteOutline:c["o"],mdiPlus:c["M"],mdiExportVariant:c["r"],mdiAccountOutline:c["a"],mdiPencilOutline:c["L"],mdiEyeOutline:c["t"],mdiFilePdfBox:c["y"],mdiFileExcel:c["w"],mdiClose:c["j"],mdiCloseBoxOutline:c["k"],mdiMinusBoxOutline:c["K"],mdiCheckboxBlankOutline:c["e"],mdiFoodAppleOutline:c["z"]}),e}},b=p,h=i("2877"),x=i("6544"),_=i.n(x),g=i("8336"),O=i("b0af"),I=i("99d9"),w=i("8fea"),C=i("169a"),j=i("ce7e"),k=i("4bd4"),y=i("132d"),A=i("8860"),E=i("da13"),L=i("5d23"),D=i("e449"),T=i("f774"),V=i("0fd9"),P=i("2fa4"),R=i("8654"),J=Object(h["a"])(b,a,s,!1,null,null,null);t["default"]=J.exports;_()(J,{VBtn:g["a"],VCard:O["a"],VCardActions:I["a"],VCardText:I["b"],VCardTitle:I["c"],VDataTable:w["a"],VDialog:C["a"],VDivider:j["a"],VForm:k["a"],VIcon:y["a"],VList:A["a"],VListItem:E["a"],VListItemTitle:L["b"],VMenu:D["a"],VNavigationDrawer:T["a"],VRow:V["a"],VSpacer:P["a"],VTextField:R["a"]})}}]);
//# sourceMappingURL=chunk-2d0c4a64.884fe977.js.map