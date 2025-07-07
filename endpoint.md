DYB CUSTOMER DASHBOARD ENDPOINTS 

-Sign UP Page 
Method: POST 
endpoint: /api/customer/auth/signup 
Schema:  
name:  string 
email: string 
password: string 
phoneNo: string 

-Sign In Page
Method POST
enpoint: /api/customer/auth/signin 
schema:
email: string
password: string

-Dashboard Page
Method: GET
endpoint: /api/customer/dashboard/stats
example response:
  data: {
   stats: [
	{
	title: "Wallet Balance"
	value: 10000
	}
	{
	title: "Total Shipments"
	value: 1000
	},
        {
	title: "Shipments in Transit"
	value: 2000000
	},
   ]
shipments: [
]
  }

-Shipments Page
Method: GET
enpoint: /api/customer/shipments

method: POST
enpoint: /api/customer/shipments/book-shipment/add-sender
schema: 
firstName: string
lastName: string
phoneNo: string
phoneNo2?: string //? to indicate it is optional
Address1: string
Address2?: string //? to indicate it is optional
email: string 
country: string
state: string
city: string
postalCode: string

method: POST
enpoint: /api/customer/shipments/book-shipment/add-reciever
schema: 
firstName: string
lastName: string
phoneNo: string
phoneNo2?: string //? to indicate it is optional
Address1: string
Address2?: string //? to indicate it is optional
email: string 
country: string
state: string
city: string
postalCode: string

method: POST
endpoint: /api/customer/shipments/book-shipment/add-items
schema: NOT SURE

method: POST
endpoint: /api/customer/shipments/book-shipment/select-carrier
schema: NOT SURE

method: GET
endpoint: /api/customer/shipments/book-shipment/review-shipment
schema: NOT SURE

