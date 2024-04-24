# CreateOrder_NewUser

## Order Read Model

```json
{
  "Id": 1,
  "UserId": "user1@test.com",
  "Date": "2024-03-04T08:29:11.915863Z",
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
      "Alias": "Payment Method on 04.03.2024 08:29:12",
      "CardNumber": "979779797979799789",
      "SecurityNumber": "440",
      "CardHolderName": "Foo Bar",
      "Expiration": "2028-03-04",
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
      "Id": "c4b82df8-cfcd-4e68-b926-301a8e041b79",
      "CreationDate": "2024-03-04T08:29:11.915444Z"
    }
  },
  {
    "Type": "OrderStatusChangedToSubmittedIntegrationEvent",
    "Message": {
      "OrderId": 1,
      "OrderStatus": "Submitted",
      "BuyerName": "user1",
      "BuyerIdentityGuid": "user1@test.com",
      "Id": "ef2c2e6c-0977-4aab-ab99-ed128c96520b",
      "CreationDate": "2024-03-04T08:29:12.232205Z"
    }
  }
]
```

