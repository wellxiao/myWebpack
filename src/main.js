import '@/styles/index.css'

// console.log(jquery)
console.log($)
// const { say } = require('./utils')
console.log(utils)
utils.say()
console.log('1112')
console.log('333333333')

const data1 = [
    { sysytemid: '5', name: 'wellxiao', sex: '男' },
    { sysytemid: '4', name: 'wellxiao', sex: '男' },
    { sysytemid: '3', name: 'wellxiao', sex: '男' },
    { sysytemid: '2', name: 'wellxiao', sex: '男' },
    { sysytemid: '1', name: 'wellxiao', sex: '男' },
    { sysytemid: '6', name: 'wellxiao', sex: '男' },
    { sysytemid: '7', name: 'wellxiao', sex: '男' },
    { sysytemid: '8', name: 'wellxiao', sex: '男' },
    { sysytemid: '9', name: 'wellxiao', sex: '男' },
    { sysytemid: '10', name: 'wellxiao', sex: '男' },
    { sysytemid: '11', name: 'wellxiao', sex: '男' },
    { sysytemid: '12', name: 'wellxiao', sex: '男' },
    { sysytemid: '13', name: 'wellxiao', sex: '男' },
    { sysytemid: '14', name: 'wellxiao', sex: '男' },
    { sysytemid: '15', name: 'wellxiao', sex: '男' },
]

//操作栏的格式化
const actionFormatter = function(value, row, index) {
    console.log(row)
    const result = `<button onclick="addClick(${row.sysytemid})">添加</button><button onclick="delClick(${row.sysytemid})">删除</button>`
    return result
}
const data = [
    { sysytemid: '1', name: 'wellxiao', sex: '男' },
    { sysytemid: '2', name: 'wellxiao', sex: '男' },
    { sysytemid: '3', name: 'wellxiao', sex: '男' },
    { sysytemid: '4', name: 'wellxiao', sex: '男' },
    { sysytemid: '5', name: 'wellxiao', sex: '男' },
    { sysytemid: '6', name: 'wellxiao', sex: '男' },
    { sysytemid: '7', name: 'wellxiao', sex: '男' },
    { sysytemid: '8', name: 'wellxiao', sex: '男' },
    { sysytemid: '9', name: 'wellxiao', sex: '男' },
    { sysytemid: '10', name: 'wellxiao', sex: '男' },
    { sysytemid: '11', name: 'wellxiao', sex: '男' },
    { sysytemid: '12', name: 'wellxiao', sex: '男' },
    { sysytemid: '13', name: 'wellxiao', sex: '男' },
    { sysytemid: '14', name: 'wellxiao', sex: '男' },
    { sysytemid: '15', name: 'wellxiao', sex: '男' },
]
const columns = [
    {
        field: 'sysytemid',
        title: ' 系统编号',
        align: 'center',
        width: 300,
    },
    {
        field: 'name',
        title: '姓名',
        align: 'center',
        sortable: false, //本列不可以排序
    },
    {
        field: 'sex',
        title: '性别',
        align: 'center',
    },
    {
        field: 'age',
        title: '操作',
        align: 'center',
        formatter: actionFormatter,
    },
]

function resetTable(data) {
    $('#mytable')
        .bootstrapTable('destroy')
        .bootstrapTable({
            data: data,
            formatLoadingMessage: function() {
                return ''
            },
            formatRecordsPerPage: function() {
                return ''
            },
            formatShowingRows: function() {
                return ''
            },
            pageNumber: 1, //初始化加载第一页，默认第一页
            pageSize: 10, //每页的记录行数（*）
            pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
            paginationPreText: '前一页',
            paginationNextText: '下一页',
            pagination: true,
            columns,
            onLoadSuccess: function(data) {
                console.log('111222221')
                //加载成功时执行
                console.log(data)
            },
        })
}

window.addClick = function addClick(row) {
    console.log('添加')
    console.log(row)
    refreshTableData()
    resetTable(data1)
}

function refreshTableData() {
    $('#server_table').bootstrapTable('refresh', data.data)
}
window.delClick = function delClick(row) {
    console.log('删除')
    console.log(row)
}
resetTable(data)
