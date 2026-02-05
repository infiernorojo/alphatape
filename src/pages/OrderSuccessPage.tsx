import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Package, Clock, Mail, ArrowRight, Home, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const { getOrderById, user } = useAuth();
  const [order, setOrder] = useState<any>(null);
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (orderId) {
      const foundOrder = getOrderById(orderId);
      setOrder(foundOrder);
    }
  }, [orderId, getOrderById]);

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Orden no encontrada</h1>
            <p className="text-muted-foreground mb-6">
              No pudimos encontrar los detalles de tu orden
            </p>
            <Link to="/">
              <Button>Volver al inicio</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="font-heading text-3xl font-bold mb-2">
            ¡Pago Exitoso!
          </h1>
          <p className="text-muted-foreground">
            Tu orden ha sido recibida y está siendo procesada
          </p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              {/* Order ID */}
              <div className="text-center pb-6 border-b border-border">
                <p className="text-sm text-muted-foreground mb-1">Número de Orden</p>
                <p className="text-2xl font-bold font-mono">{order.id}</p>
              </div>

              {/* Details */}
              <div className="py-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Fecha</span>
                  </div>
                  <span>{formatDate(order.createdAt)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </div>
                  <span>{order.email}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    <span>Servicios</span>
                  </div>
                  <span>{order.items.length} servicio{order.items.length > 1 ? "s" : ""}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Package className="w-4 h-4" />
                    <span>Estado</span>
                  </div>
                  <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-sm font-medium">
                    Pendiente
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">Total Pagado</span>
                  <span className="text-2xl font-bold text-primary">
                    ${order.totalPrice.toLocaleString()} MXN
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h2 className="font-bold text-lg mb-4">¿Qué sigue?</h2>
          <div className="grid gap-4">
            <Card>
              <CardContent className="p-4 flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Confirmación por Email</h3>
                  <p className="text-sm text-muted-foreground">
                    Hemos enviado los detalles de tu orden a {order.email}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Tiempo de Entrega</h3>
                  <p className="text-sm text-muted-foreground">
                    Los servicios comenzarán a procesarse en los próximos minutos. 
                    La entrega completa puede tomar de 1 a 24 horas dependiendo del volumen.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Seguimiento</h3>
                  <p className="text-sm text-muted-foreground">
                    {user ? (
                      <>
                        Puedes seguir el estado de tu orden en tu{" "}
                        <Link to="/orders" className="text-primary hover:underline">
                          panel de órdenes
                        </Link>
                      </>
                    ) : (
                      "Guarda tu número de orden para consultar el estado más tarde"
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Button>
          </Link>
          {user && (
            <Link to="/orders" className="flex-1">
              <Button className="w-full">
                Ver Mis Órdenes
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
