import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const hospitals = [
  "Central Medical Center",
  "North Valley Hospital",
  "East Side Clinic",
  "West End Medical",
];

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const cartItems = location.state?.cartItems || [];

  const [formData, setFormData] = useState({
    hospital: "",
    nurseName: "",
    empId: "",
    hodName: "",
  });

  const total = cartItems.reduce(
    (sum: number, item: any) => sum + (typeof item.price === 'number' ? item.price : parseFloat(item.price.toString().replace("$", ""))) * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hospital || !formData.nurseName || !formData.empId || !formData.hodName) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields",
      });
      return;
    }

    navigate("/checkout-success", { state: { ...formData, cartItems, total } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
          <p className="text-muted-foreground">Your cart is empty</p>
        </div>
        <Button onClick={() => navigate("/shop")}>Go to Shop</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
        <p className="text-muted-foreground">Complete your order</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cartItems.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-border pb-2"
                >
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-primary">
                    ${((typeof item.price === 'number' ? item.price : parseFloat(item.price.toString().replace("$", ""))) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hospital">Hospital</Label>
                <Select
                  value={formData.hospital}
                  onValueChange={(value) =>
                    setFormData({ ...formData, hospital: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    {hospitals.map((hospital) => (
                      <SelectItem key={hospital} value={hospital}>
                        {hospital}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nurseName">Nurse Name</Label>
                <Input
                  id="nurseName"
                  placeholder="Enter your name"
                  value={formData.nurseName}
                  onChange={(e) =>
                    setFormData({ ...formData, nurseName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="empId">Employee ID</Label>
                <Input
                  id="empId"
                  placeholder="Enter employee ID"
                  value={formData.empId}
                  onChange={(e) =>
                    setFormData({ ...formData, empId: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hodName">HOD Name</Label>
                <Input
                  id="hodName"
                  placeholder="Enter HOD name"
                  value={formData.hodName}
                  onChange={(e) =>
                    setFormData({ ...formData, hodName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/shop")}
                >
                  Back to Shop
                </Button>
                <Button type="submit" className="flex-1">
                  Complete Order
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
