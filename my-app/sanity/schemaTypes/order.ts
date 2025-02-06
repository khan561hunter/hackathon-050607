export default {
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "customerName",
      title: "Customer Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: ["Pending", "Processing", "Shipped", "Delivered"],
      },
    },
  ],
};
