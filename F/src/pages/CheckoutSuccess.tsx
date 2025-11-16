import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state;

  useEffect(() => {
    if (!orderData) {
      navigate("/shop");
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const orderId = `ORD-${Date.now().toString().slice(-6)}`;

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
            <CheckCircle className="h-10 w-10 text-accent" />
          </div>
          <CardTitle className="text-2xl">Order Successful!</CardTitle>
          <p className="text-muted-foreground">
            Your order has been placed successfully
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-border bg-secondary/50 p-4">
            <div className="mb-3 text-center">
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="text-2xl font-bold text-primary">{orderId}</p>
            </div>
            <div className="grid gap-3 border-t border-border pt-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hospital:</span>
                <span className="font-medium text-foreground">
                  {orderData.hospital}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nurse Name:</span>
                <span className="font-medium text-foreground">
                  {orderData.nurseName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Employee ID:</span>
                <span className="font-medium text-foreground">
                  {orderData.empId}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="text-xl font-bold text-primary">
                  ${orderData.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Items Ordered:</h3>
            <div className="space-y-2">
              {orderData.cartItems.map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-between rounded-md bg-secondary p-2 text-sm"
                >
                  <span className="text-foreground">
                    {item.name} (x{item.quantity})
                  </span>
                  <span className="font-medium text-primary">
                    ${(
                      parseFloat(item.price.replace("$", "")) * item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/")}
            >
              Back to Dashboard
            </Button>
            <Button className="flex-1" onClick={() => navigate("/shop")}>
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutSuccess;
