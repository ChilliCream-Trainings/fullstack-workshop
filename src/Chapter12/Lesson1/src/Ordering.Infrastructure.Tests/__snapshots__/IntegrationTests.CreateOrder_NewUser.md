# CreateOrder_NewUser

## Order Read Model

```json
{
  "Id": 1,
  "UserId": "user1@test.com",
  "Date": "2024-03-03T22:58:32.504406Z",
  "Status": "Submitted",
  "Description": null,
  "Address": {
    "Street": "city",
    "City": "street",
    "State": "state",
    "ZipCode": "zipcode",
    "Country": "country"
  },
  "Items": [
    {
      "Product": {
        "Id": 1,
        "Name": "Product 1",
        "ImageUrl": "http://image.com/"
      },
      "Units": 3,
      "UnitPrice": 1.0
    }
  ],
  "Total": 3.0
}
```

## User Aggregate

```json
{
  "Id": "user1@test.com",
  "Name": "user1",
  "PaymentMethods": [
    {
      "Id": 1,
      "Alias": "Payment Method on 03.03.2024 22:58:32",
      "CardNumber": "979779797979799789",
      "SecurityNumber": "440",
      "CardHolderName": "Foo Bar",
      "Expiration": "2028-03-03",
      "CardType": "Visa",
      "Events": []
    }
  ],
  "Events": []
}
```

## Integration Events

```json
[
  {
    "Type": "OrderStartedIntegrationEvent",
    "Message": {
      "UserId": "user1@test.com",
      "Id": "7acb52c0-c70d-49c8-a61e-b509c356eb1c",
      "CreationDate": "2024-03-03T22:58:32.503959Z"
    }
  },
  {
    "Type": "OrderStatusChangedToSubmittedIntegrationEvent",
    "Message": {
      "OrderId": 1,
      "OrderStatus": "Submitted",
      "BuyerName": "user1",
      "BuyerIdentityGuid": "user1@test.com",
      "Id": "0fbbf34b-4623-4222-ac19-48b918ad5928",
      "CreationDate": "2024-03-03T22:58:32.783199Z"
    }
  }
]
```

