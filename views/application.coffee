$ ->
  $('#start_time')
  .datepicker( changeYear: true, yearRange: '2013:2015' )

$ ->
  $('#end_time')
  .datepicker( changeYear: true, yearRange: '2013:2015' )


$ ->
  $('#flexme3')
  .flexigrid({ url: '/vacations/json',method: 'GET', dataType: 'json',colModel:[{display: 'Name', name : 'name', width : 100, sortable : true, align: 'center'},{display: 'Start Time', name : 'Start Time', width : 180, sortable : true, align: 'left'},{display: 'End Time', name : 'End Time', width : 180, sortable : true, align: 'left'},{display: 'Reason', name : 'Reason', width : 230, sortable : true, align: 'left', hide: false},{display: 'Vacation Status', name : 'numcode', width : 80, sortable : true, align: 'right' }],searchitems : [{display: 'Start Time', name : 'start name'},{display: 'Name', name : 'name', isdefault: true}], buttons : [ {name : 'Add',bclass : 'add' , onpress :  test}, {name : 'Delete',bclass : 'delete' , onpress : test}, {separator : true} ], sortname: 'name',sortorder: 'asc',usepager: true,title: 'Employee Vacation',useRp: true,rp: 15,showTableToggleBtn: true,width: 700,height: 360 })


