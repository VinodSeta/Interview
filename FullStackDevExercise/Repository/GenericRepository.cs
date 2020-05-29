using FullStackDevExercise.Db;
using FullStackDevExercise.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FullStackDevExercise.Repository
{
  public class GenericRepository<T> : IGenericService<T> where T : class
  {

    private readonly DoLittleDb _context;
    private readonly DbSet<T> _entities;

    protected GenericRepository(DoLittleDb context)
    {
      _context = context;
      _entities = context.Set<T>();
      //_assessor = accessor;
    }
    public virtual void BeginTransaction()
    {
      _context.Database.BeginTransactionAsync();
    }
    public virtual void CommitTransaction()
    {
      _context.Database.CommitTransaction();
    }
    public virtual void RollbackTransaction()
    {
      _context.Database.RollbackTransaction();
    }

    public virtual IQueryable<T> GetAll(bool asNoTracking = false)
    {
      return asNoTracking ? _context.Set<T>().AsNoTracking() : _context.Set<T>();
    }
    public IEnumerable<T> GetAll(Expression<Func<T, bool>> predicate, bool asNoTracking = false, params Expression<Func<T, object>>[] includeProperties)
    {

      IQueryable<T> query = _context.Set<T>();
      query = includeProperties.Aggregate(query, (current, includeProperty) => current.Include(includeProperty));

      return asNoTracking ? query.AsNoTracking().Where(predicate) : query.Where(predicate);
    }

    public virtual async Task<List<T>> ListAsync(Expression<Func<T, bool>> predicate, bool asNoTracking = false)
    {
      if (asNoTracking)
        return await _context.Set<T>().AsNoTracking().Where(predicate).ToListAsync();
      return await _context.Set<T>().Where(predicate).ToListAsync();
    }

    public virtual int Count()
    {
      return _context.Set<T>().AsNoTracking().Count();
    }

    public T GetSingle(Expression<Func<T, bool>> predicate, bool asNoTracking = false)
    {
      if (asNoTracking)
        return _context.Set<T>().AsNoTracking().FirstOrDefault(predicate);
      return _context.Set<T>().FirstOrDefault(predicate);
    }

    public async Task<T> GetSingleAsync(Expression<Func<T, bool>> predicate, bool asNoTracking = false)
    {
      if (asNoTracking)
        return await _context.Set<T>().AsNoTracking().FirstOrDefaultAsync(predicate);
      return await _context.Set<T>().FirstOrDefaultAsync(predicate);
    }

    public T GetSingle(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
    {
      IQueryable<T> query = _context.Set<T>();
      query = includeProperties.Aggregate(query, (current, includeProperty) => current.Include(includeProperty));

      return query.Where(predicate).FirstOrDefault();
    }

    public T GetSingleWithoutTracking(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
    {
      var query = _context.Set<T>().AsNoTracking();
      query = includeProperties.Aggregate(query, (current, includeProperty) => current.Include(includeProperty));

      return query.Where(predicate).FirstOrDefault();
    }


    public async Task<T> GetSingleAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
    {
      IQueryable<T> query = _context.Set<T>();
      query = includeProperties.Aggregate(query, (current, includeProperty) => current.Include(includeProperty));

      return await query.Where(predicate).FirstOrDefaultAsync();
    }

    public async Task<T> GetSingleWithoutTrackingAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
    {
      var query = _context.Set<T>().AsNoTracking();
      query = includeProperties.Aggregate(query, (current, includeProperty) => current.Include(includeProperty));

      return await query.Where(predicate).FirstOrDefaultAsync();
    }

    public virtual IQueryable<T> FindBy(Expression<Func<T, bool>> predicate, bool asNoTracking = false)
    {
      return asNoTracking ? _context.Set<T>().AsNoTracking().Where(predicate) : _context.Set<T>().Where(predicate);
    }

    public virtual void Add(T entity)
    {
      _context.Set<T>().Add(entity);
    }

    public virtual void AddAsync(T entity)
    {
      _context.Set<T>().AddAsync(entity);
    }

    public virtual void AddRange(IEnumerable<T> entity)
    {
      _context.Set<T>().AddRange(entity);
    }

    public virtual void AddRangeAsync(IEnumerable<T> entity)
    {
      _context.Set<T>().AddRangeAsync(entity);
    }

    public virtual void Update(T entity)
    {
      EntityEntry dbEntityEntry = _context.Entry<T>(entity);
      dbEntityEntry.State = EntityState.Modified;
    }

    public virtual void Delete(T entity)
    {
      EntityEntry dbEntityEntry = _context.Entry<T>(entity);
      dbEntityEntry.State = EntityState.Deleted;
    }

    public void DeleteRange(IEnumerable<T> entity)
    {
      _context.Set<T>().RemoveRange(entity);
    }

    public virtual void DeleteWhere(Expression<Func<T, bool>> predicate)
    {
      var entities = _context.Set<T>().Where(predicate);

      foreach (var entity in entities)
      {
        _context.Entry<T>(entity).State = EntityState.Deleted;
      }
    }

    public virtual void Save()
    {
      _context.SaveChanges();
    }

    public virtual void Detach(T entity)
    {
      EntityEntry dbEntityEntry = _context.Entry<T>(entity);
      switch (dbEntityEntry.State)
      {
        case EntityState.Modified:
          dbEntityEntry.State = EntityState.Unchanged;
          break;
        case EntityState.Added:
          dbEntityEntry.State = EntityState.Detached;
          break;
        case EntityState.Deleted:
          dbEntityEntry.Reload();
          break;
        default: break;
      }
    }

    public virtual async Task SaveAsync()
    {
      await _context.SaveChangesAsync();
    }


  }
}
