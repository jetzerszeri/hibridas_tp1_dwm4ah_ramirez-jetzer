# Colecciones

User: 
- _id
- name - string
- email - string
- password - string
- role  - string
- createdAt - date
- updatedAt - date


Vendor:
- _id
- name: nombre apellido - string
- email: nombre@gmail.com - string
- phone: +1 704 111 1111 - number
- active: true - boolean
- type: subcontractor
- agreetment: null
- hiredDate: yyyy/mm/dd - date
- createdAt - date
- updatedAt - date



Customer:
- _id
- name: Avenue One LLC - string
- address: 123 street, charlotte 28208 - string
- createdAt - date
- updatedAt - date


Project:
- _id
- customerId: customer._id (ref)
- receivedDate: yyyy/mm/dd - date
- dueDate: yyyy/mm/dd - date
- projectManager: user._id (ref)
- status: upcoming - string
- contracts: {
    contractId1 (ref), 
    contractId2 (ref)
}
- createdAt - date
- updatedAt - date


Contract:
- _id
- porjectId: project._id (ref)
- type: Reno/Landscaping - string
- vendorId: vendor._id (ref)
- amount: $$$ - number
- agreement: 1 (default) //(1: 20%, 2: 10%, 3:0%)
- status: started
- assignedOn: yyy/mm/dd - date
- dueDate: yyy/mm/dd - date
- closedOn: - date
- createdAt - date
- updatedAt - date



