using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApiCore.Paging
{
    public class PagedList<T> : List<T>
    {
        public int CurrentPage { get; set; }
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int TotalPage { get; set; }
        public bool HasPrevious => CurrentPage > 1;
        public bool HasNext => CurrentPage < TotalCount;
        public string OrderBy { get; set; }
        public PagedList(List<T> item, int count, int pageSize, int pageNumber, string orderBy)
        {
            TotalCount = count;
            PageSize = pageSize;
            CurrentPage = pageNumber;
            OrderBy = orderBy;
            TotalPage = (int)Math.Ceiling(count / (double)pageSize);
            AddRange(item);
        }
        public static PagedList<T> GetPagedList(IQueryable<T> source, int pageNumber, int pageSize, string orderBy = "departmentName")
        {
            var count = source.Count();
            Sorting<T>.ApplySort(ref source, orderBy);
            var items = source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            return new PagedList<T>(items, count, pageNumber, pageSize, orderBy);
        }
    }
}
