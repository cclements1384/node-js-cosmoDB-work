var config = {}

config.endpoint = 'https://jcleme.documents.azure.com:443/'
config.key = 'x5dm3XvAuxl8s0fNMo60pBrbUcRCfc98QWdAhsfd2ISPwC7gfJVOUlvyhxrPv5nkXSYowhqUfkuM5GK8sriTCQ=='

config.database = {
  id: 'ToDoList'
}

config.container = {
  id: 'Items'
}

config.items = {
  expense: {
    "id": "3",
    "category": "work",
    "name": "Expense Report",
    "description": "Submit expense report to SAP.",
    "isComplete": false,
  }
}

module.exports = config
