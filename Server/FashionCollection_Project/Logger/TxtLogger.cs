﻿using Microsoft.Extensions.Logging.EventSource;
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
        public void LogEvent(EventType eventType, string message, DateTime dateTime)
        {
            using (var streamWriter = new StreamWriter(@"‪‪‪log.txt", true))
            {
                streamWriter.WriteLine($"EventType: {eventType.ToString()}, Message: {message}, DateTime: {dateTime.ToString("dd/MM/YYYY hh:mm:ss")}");
            }
        }
    }
}
