using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Logger
{
    public interface ILogger
    {
        void LogEvent(EventType eventType, string message, DateTime dateTime);
    }
}
