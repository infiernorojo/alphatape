import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ChevronRight,
  Calendar,
  CreditCard,
  Bitcoin,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { getOrderTimeline } from "@/lib/orderTimeline";

const statusConfig = {
  pending: {
    label: "Recibido",
    color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    icon: Clock,
  },
  processing: {
    label: "Procesando",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    icon: Package,
  },
  completed: {
    label: "Completado",
    color: "bg-green-500/10 text-green-500 border-green-500/20",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelado",
    color: "bg-red-500/10 text-red-500 border-red-500/20",
    icon: XCircle,
  },
};

const OrdersPage = () => {
  const { orders, user } = useAuth();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

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

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Inicia sesión para ver tus órdenes</h1>
          <Link to="/login">
            <Button>Iniciar Sesión</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </Link>
              <h1 className="font-heading text-xl font-bold">Mis Órdenes</h1>
            </div>
            <Link to="/profile">
              <Button variant="outline" size="sm">
                Mi Perfil
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">No tienes órdenes aún</h2>
            <p className="text-muted-foreground mb-6">
              Realiza tu primera compra para verla aquí
            </p>
            <Link to="/">
              <Button>Ver Servicios</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;
              const isExpanded = expandedOrder === order.id;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                  {/* Order Header */}
                  <div
                    className="p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold">{order.id}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {formatDate(order.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className={status.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status.label}
                        </Badge>
                        <ChevronRight
                          className={`w-5 h-5 text-muted-foreground transition-transform ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {order.items.length} servicio{order.items.length > 1 ? "s" : ""}
                      </span>
                      <span className="font-bold text-lg">
                        ${order.totalPrice.toLocaleString()} MXN
                      </span>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-border bg-muted/30"
                    >
                      <div className="p-6 space-y-4">
                        {/* Items */}
                        <div>
                          <h4 className="font-bold mb-3">Servicios</h4>
                          <div className="space-y-2">
                            {order.items.map((item, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between p-3 bg-background rounded-lg"
                              >
                                <div>
                                  <p className="font-medium">
                                    {item.platform} {item.type}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {item.state} • {item.quantity}x
                                  </p>
                                  {item.targetUrl && (
                                    <a
                                      href={item.targetUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-primary hover:underline truncate max-w-xs block"
                                    >
                                      {item.targetUrl}
                                    </a>
                                  )}
                                </div>
                                <span className="font-bold">
                                  ${(item.price * item.quantity).toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Payment Info */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {order.paymentMethod === "card" ? (
                              <>
                                <CreditCard className="w-4 h-4" />
                                Tarjeta
                              </>
                            ) : (
                              <>
                                <Bitcoin className="w-4 h-4" />
                                {order.paymentDetails?.cryptoSymbol || "Cripto"}
                                {order.paymentDetails?.networkName ? ` • ${order.paymentDetails.networkName}` : ""}
                              </>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Total</p>
                            <p className="font-bold text-xl">
                              ${order.totalPrice.toLocaleString()} MXN
                            </p>
                          </div>
                        </div>

                        {/* Status Timeline */}
                        <div className="pt-4 border-t border-border">
                          <h4 className="font-bold mb-3">Estado del Pedido</h4>

                          {(() => {
                            const timeline = getOrderTimeline(order.createdAt, order.status);
                            return (
                              <div className="space-y-2">
                                {timeline.map((ev) => (
                                  <div key={ev.label} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                      <div className={`w-2.5 h-2.5 rounded-full ${
                                        ev.status === "completed" ? "bg-green-500" :
                                        ev.status === "processing" ? "bg-blue-500" :
                                        ev.status === "cancelled" ? "bg-red-500" :
                                        "bg-yellow-500"
                                      }`} />
                                      <span className="font-medium">{ev.label}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{formatDate(ev.at)}</span>
                                  </div>
                                ))}
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrdersPage;
