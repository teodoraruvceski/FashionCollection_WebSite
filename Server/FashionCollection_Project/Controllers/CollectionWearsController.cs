using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FashionCollection_Project.Database;
using FashionCollection_Project.Database.interfaces;
using FashionCollection_Project.Logger;
using FashionCollection_Project.Models;
using FashionCollection_Project.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FashionCollection_Project.Controllers
{
    
    [Route("[controller]")]
    [ApiController]
    public class CollectionWearsController : ControllerBase
    {
        ICollectionProvider collectionProvider = new DBCollectionProvider();
        IWearProvider wearProvider = new DBWearProvider();
        ILogger logger = new TxtLogger();

        [HttpGet]
        [Route("get")]
        public IEnumerable<WearDTO> Get(int id)
        {
            //FashionCollection f1 = new FashionCollection("Armani", 10, 2009, "summer");
            //FashionCollection f2 = new FashionCollection("Gucci", 10, 2020, "winter");
            //List<FashionCollection> l = new List<FashionCollection>() { f1, f2 };
            //DBProvider.AddCollection(f1);
            //DBProvider.AddCollection(f2);
            
            FashionCollection fc = collectionProvider.FindCollectionById(id);
            List<Wear> proba = fc.Wears.ToList() ;
            List<Wear> l = new List<Wear>();
            if (fc != null)
                l = wearProvider.RetrieveWearsByCollectionId(id);
            List<WearDTO> ret = new List<WearDTO>();
            foreach(Wear w in l)
            {
                ret.Add(w.CreateDTO());
            }
            return ret;
        }
        [HttpDelete]
        [Route("deleteWear")]
        public string DeleteWear(int id)
        {
            if (wearProvider.DeleteWear(id))
            {
                logger.LogEvent(EventType.INFO, $"Wear with id: {id} deleted.", DateTime.Now);
                return "ok";
            }
            else
            {
                logger.LogEvent(EventType.ERROR, $"Wear with id: {id} does not exist.", DateTime.Now);
                return "error";
            }
        }
        [HttpGet]
        [Route("copy")]
        public void Copy(int id)
        {
            Wear w= wearProvider.FindWearById(id);
            if(w!=null)
            {
                Wear newWear = new Wear(w.Name, w.Description, w.FashionCollectionId,w.Type);
                wearProvider.AddWear(newWear);
                logger.LogEvent(EventType.INFO, $"Wear with id: {id} copied.", DateTime.Now);
            }
            else
            {
                logger.LogEvent(EventType.ERROR, $"Wear with id: {id} does not exist.", DateTime.Now);

            }
        }
       
        [HttpPost]
        [Route("addWear")]
        public IActionResult AddWear([FromBody]WearDTO wear)
        {
            List<Wear> wears= wearProvider.RetrieveWearsByCollectionId(wear.FashionCollectionId);
            FashionCollection fc = collectionProvider.FindCollectionById(wear.FashionCollectionId);
            Wear pom = wear.CreateWear();
            foreach (Wear ww in wears)
            {
                if (ww.Name == wear.Name && ww.Type==pom.Type)
                {
                    logger.LogEvent(EventType.ERROR, $"Wear with name: {wear.Name} already exist.", DateTime.Now);
                    return NotFound("Collection already exists");
                }

            }
            pom.FashionCollection = fc;
            fc.Wears.Add(pom);
            collectionProvider.UpdateCollection(fc);
           // wearProvider.AddWear(pom);
            logger.LogEvent(EventType.INFO, $"Wear with name: {wear.Name} added.", DateTime.Now);

            return Ok("ok");
        }
        [HttpPost]
        [Route("editWear")]
        public IActionResult EditWear([FromBody]WearDTO wear)
        {
            if(wearProvider.FindWearById(wear.Id)!=null)
            {
                wearProvider.UpdateWear(wear.CreateWear());
                logger.LogEvent(EventType.INFO, $"Wear with id: {wear.Id} edited.",DateTime.Now);
                return Ok("ok");
            }
            else
            {
                logger.LogEvent(EventType.ERROR, $"Wear with id: {wear.Id} does not exist.", DateTime.Now);
                return NotFound("Wear does not exist.");
            }
            
        }
    }
}