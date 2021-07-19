using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BelakorGamesAPI.Infrastructure.Classes
{
    public class ViewModelDetallePedido
    {
        public int IdPedido { get; set; }
        public int IdProducto { get; set; }
        public decimal Cantidad { get; set; }
        public bool Devuelto { get; set; }
    }
}
