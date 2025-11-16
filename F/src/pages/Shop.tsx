import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const products = [
  {
    id: 1,
    name: "Surgical Gloves Box",
    category: "PPE",
    stock: 156,
    inStock: true,
  },
  {
    id: 2,
    name: "Digital Thermometer",
    category: "Equipment",
    stock: 42,
    inStock: true,
  },
  {
    id: 3,
    name: "Sterile Gauze Pack",
    category: "Supplies",
    stock: 289,
    inStock: true,
  },
  {
    id: 4,
    name: "Blood Pressure Monitor",
    category: "Equipment",
    stock: 18,
    inStock: true,
  },
  {
    id: 5,
    name: "Surgical Mask Box",
    category: "PPE",
    stock: 0,
    inStock: false,
  },
  {
    id: 6,
    name: "Stethoscope",
    category: "Equipment",
    stock: 34,
    inStock: true,
  },
];

const Shop = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  const addToCart = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
    toast({
      title: "Added to Cart",
      description: "Item has been added to your cart",
    });
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart((prev) => {
      const newQuantity = (prev[productId] || 0) + change;
      if (newQuantity <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQuantity };
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const { [productId]: _, ...rest } = prev;
      return rest;
    });
  };

  const cartItems = Object.entries(cart).map(([id, quantity]) => ({
    ...products.find((p) => p.id === parseInt(id))!,
    quantity,
  }));

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        variant: "destructive",
        title: "Cart is Empty",
        description: "Please add items to cart before checkout",
      });
      return;
    }
    navigate("/checkout", { state: { cartItems } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Medical Supply Shop</h1>
          <p className="text-muted-foreground">Order surgical instruments and equipment</p>
        </div>
        <Card className="min-w-[200px]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Cart ({totalItems})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Items:</span>
              <span className="font-bold text-primary">{totalItems}</span>
            </div>
            <Button className="w-full" onClick={handleCheckout}>
              Checkout
            </Button>
          </CardContent>
        </Card>
      </div>

      {cartItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Cart Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-md border border-border p-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{product.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {product.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Stock</p>
                    <p
                      className={`font-semibold ${
                        product.inStock ? "text-accent" : "text-destructive"
                      }`}
                    >
                      {product.stock} units
                    </p>
                  </div>
                </div>
                <Button
                  className="w-full"
                  disabled={!product.inStock}
                  variant={product.inStock ? "default" : "secondary"}
                  onClick={() => addToCart(product.id)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;
