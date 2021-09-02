using Microsoft.Extensions.Logging.EventSource;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Logger
{
    public enum EventType { DEBUG, INFO, WARN, ERROR, FATAL }
    public class TxtLogger : ILogger
    {
        private static TxtLogger instance;
        private TxtLogger()
        {
            
        }
        public static TxtLogger Instance()
        {
            
            if(instance==null)
            {
                instance = new TxtLogger();
            }
            return instance;

        }
        public void LogEvent(EventType eventType, string message, DateTime dateTime)
        {
            using (var streamWriter = new StreamWriter(@"‪‪‪log.txt", true))
            {
                streamWriter.WriteLine($"EventType: {eventType.ToString()}, Message: {message}, DateTime: {dateTime.ToString("dd/MM/yyyy hh:mm:ss")}");
            }
        }
    }
}
