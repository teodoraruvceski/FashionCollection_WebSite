using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FashionCollection_Project.Database;
using FashionCollection_Project.Database.interfaces;
using FashionCollection_Project.Models;
using FashionCollection_Project.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FashionCollection_Project
{
    [ApiController]
    [Route("[controller]")]
    public class FashionCollectionController : ControllerBase
    {
        ICollectionProvider collectionProvider = new DBCollectionProvider();
        [HttpGet]
        [Route("get")]
        public IEnumerable<FashionCollection> Get()
        {
            //FashionCollection f1 = new FashionCollection("Armani", 10, 2009, "summer");
            //FashionCollection f2 = new FashionCollection("Gucci", 10, 2020, "winter");
            //List<FashionCollection> l = new List<FashionCollection>() { f1, f2 };
            //DBProvider.AddCollection(f1);
            //DBProvider.AddCollection(f2);
            List<FashionCollection> l = collectionProvider.RetrieveAllCollections();
            return l;
        }
        [HttpDelete]
        [Route("delete")]
        public string Delete(int id)
        {
            if (collectionProvider.DeleteCollection(id))
            {
                Logger.LogEvent(EventType.INFO, $"Collection with id: {id} deleted.", DateTime.Now);
                return "ok";

            }
            else
            {
                Logger.LogEvent(EventType.ERROR, $"Collection with id: {id} cannot be deleted, it does not exist.", DateTime.Now);
                return "error";
            }
        }
        [HttpGet]
        [Route("copy")]
        public void Copy(int id)
        {
            FashionCollection fc = collectionProvider.FindCollectionById(id);
            FashionCollection newCollection= new FashionCollection(fc.Designer, fc.Year, fc.Season);
            if (fc != null)
            {
                Logger.LogEvent(EventType.INFO, $"Collection with id: {id} copied.", DateTime.Now);
                collectionProvider.AddCollection(newCollection);
            }
            else
            {
                Logger.LogEvent(EventType.ERROR, $"Collection with id: {id} cannot be copied, it does not exist.", DateTime.Now);
            }
        }
        [HttpGet]
        [Route("rate")]
        public void Rate(int id,int rate)
        {
            FashionCollection fc = collectionProvider.FindCollectionById(id);
            if(fc!=null)
            {
                fc.RateCount++;
                fc.Rates += (uint)rate;
                fc.Score = fc.Rates / fc.RateCount;
                //uint newScore=
                int s =(int)fc.Season;
                EditCollection(new FashionCollectionDTO(fc.Designer,fc.Year,s.ToString()));
                Logger.LogEvent(EventType.INFO, $"Collection with id: {id} rated with {rate}.", DateTime.Now);

            }
            else
            {
                Logger.LogEvent(EventType.ERROR, $"Collection with id: {id} cannot be rated, it does not exist.", DateTime.Now);

            }
        }
        [HttpPost]
        [Route("addCollection")]
        public IActionResult AddCollection([FromBody]FashionCollectionDTO collection)
        {
            int season = Int32.Parse(collection.Season);
            if (season < 0 || season > 3)
                return NotFound("Invalid input.");
            List<FashionCollection> collections = DBProvider.RetrieveAllCollections();
            FashionCollection fashionCollection = collection.CreateFashionCollection();
            foreach(FashionCollection fc in collections)
            {
                if(fc.Designer==collection.Designer && fc.Season== fashionCollection.Season)
                {
                    Logger.LogEvent(EventType.ERROR, $"Collection by {collection.Designer} for season: {collection.Season} cannot be added, it already exist.", DateTime.Now);
                    return NotFound("Collection already exists");
                }
                
            }
            Logger.LogEvent(EventType.INFO, $"Collection  by {collection.Designer} for season: {collection.Season} added.", DateTime.Now);
            collectionProvider.AddCollection(fashionCollection);
            
            return Ok("Added");
        }
        [HttpPost]
        [Route("editCollection")]
        public IActionResult EditCollection([FromBody]FashionCollectionDTO collection)
        {
            int season = Int32.Parse(collection.Season);
            if (season < 0 || season > 3)
                return NotFound("Invalid input.");
            if (collectionProvider.FindCollectionById(collection.Id)!=null)
            {
                collectionProvider.UpdateCollection(collection.CreateFashionCollection());
                Logger.LogEvent(EventType.INFO, $"Collection  by {collection.Designer} for season: {collection.Season} edited.", DateTime.Now);
                return Ok("ok");
            }
            else
            {
                Logger.LogEvent(EventType.ERROR, $"Collection by {collection.Designer} for season: {collection.Season} cannot be edited, it does not exist.", DateTime.Now);
                return NotFound("Collection does not exist.");
            }

        }
    }
}
