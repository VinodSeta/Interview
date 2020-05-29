using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FullStackDevExercise.Interface
{
  public interface IGenericService<T> where T : class
  {
    IQueryable<T> GetAll(bool asNoTracking = false);
    IEnumerable<T> GetAll(Expression<Func<T, bool>> predicate, bool asNoTracking = false, params Expression<Func<T, object>>[] includePropertie);
    Task<List<T>> ListAsync(Expression<Func<T, bool>> predicate, bool asNoTracking = false);
    int Count();
    //T GetSingle(Guid id);
    T GetSingle(Expression<Func<T, bool>> predicate, bool asNoTracking = false);
    Task<T> GetSingleAsync(Expression<Func<T, bool>> predicate, bool asNoTracking = false);
    T GetSingle(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);
    T GetSingleWithoutTracking(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);
    Task<T> GetSingleAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);
    Task<T> GetSingleWithoutTrackingAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);
    IQueryable<T> FindBy(Expression<Func<T, bool>> predicate, bool asNoTracking = false);
    void Add(T entity);
    void AddAsync(T entity);
    void AddRange(IEnumerable<T> entity);
    void AddRangeAsync(IEnumerable<T> entity);
    void Update(T entity);
    void Delete(T entity);
    void DeleteRange(IEnumerable<T> entity);
    void DeleteWhere(Expression<Func<T, bool>> predicate);
    void Save();
    void Detach(T entity);
    Task SaveAsync();
  }
}
