import React, { useState, useEffect } from 'react';

const EMOJI_LIST = [
  { emoji: '‼️', label: 'verifiche/interrogazioni' },
  { emoji: '📚', label: 'compiti/studio' },
  { emoji: '🎸', label: 'musica' },
  { emoji: '🍎', label: 'merenda' },
  { emoji: '🎒', label: 'scuola' },
  { emoji: '⚽️', label: 'sport' },
  { emoji: '🎨', label: 'tempo libero' },
  { emoji: '🛁', label: 'cura di sè' },
  { emoji: '🛏️', label: 'sonno' },
  { emoji: '🦷', label: 'visite mediche' },
  { emoji: '🥪', label: 'pasti' }
];

const THEMES = [
  {
    id: 'notebook',
    name: '✏️ Quaderno',
    emoji: '✏️',
    bgColor: '#fdf6e3',
    bgImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cpath d='M0 40h160M0 80h160M0 120h160M40 0v160M80 0v160M120 0v160' fill='none' stroke='rgba(0,0,0,0.015)' stroke-width='1'/%3E%3Cpath d='M25 35l15-15 4 4-15 15zM25 35l-3 3 1-4z' fill='none' stroke='rgba(0,0,0,0.035)' stroke-width='1.5'/%3E%3Crect x='105' y='100' width='22' height='28' rx='2' fill='none' stroke='rgba(0,0,0,0.035)' stroke-width='1.5'/%3E%3Cpath d='M110 107h12M110 113h12M110 119h12' fill='none' stroke='rgba(0,0,0,0.015)' stroke-width='1'/%3E%3C/svg%3E")`
  },
  {
    id: 'sky',
    name: '☁️ Azzurro Nuvola',
    emoji: '☁️',
    bgColor: '#e3f2fd',
    bgImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='20' cy='40' r='6' fill='none' stroke='rgba(0,0,0,0.02)' stroke-width='1.5'/%3E%3Ccircle cx='30' cy='36' r='8' fill='none' stroke='rgba(0,0,0,0.02)' stroke-width='1.5'/%3E%3Ccircle cx='42' cy='40' r='6' fill='none' stroke='rgba(0,0,0,0.02)' stroke-width='1.5'/%3E%3Cpath d='M18 46h26' stroke='rgba(0,0,0,0.02)' stroke-width='1.5'/%3E%3C/svg%3E")`
  },
  {
    id: 'stars',
    name: '⭐ Lilla Stellato',
    emoji: '⭐',
    bgColor: '#f5f0ff',
    bgImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M20 10l2 3 3 1-2 2 1 3-3-1-3 1 1-3-2-2 3-1zM45 35l1 2 2 1-1 2 1 2-2-1-2 1 1-2-2-1 2-1z' fill='none' stroke='rgba(0,0,0,0.03)' stroke-width='1'/%3E%3C/svg%3E")`
  },
  {
    id: 'meadow',
    name: '🌸 Prato Verde',
    emoji: '🌸',
    bgColor: '#e8f5e9',
    bgImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='20' cy='20' r='2' fill='none' stroke='rgba(0,0,0,0.03)' stroke-width='1.5'/%3E%3Ccircle cx='20' cy='15' r='2' fill='none' stroke='rgba(0,0,0,0.03)' stroke-width='1.5'/%3E%3Ccircle cx='25' cy='20' r='2' fill='none' stroke='rgba(0,0,0,0.03)' stroke-width='1.5'/%3E%3Ccircle cx='15' cy='20' r='2' fill='none' stroke='rgba(0,0,0,0.03)' stroke-width='1.5'/%3E%3Ccircle cx='20' cy='25' r='2' fill='none' stroke='rgba(0,0,0,0.03)' stroke-width='1.5'/%3E%3C/svg%3E")`
  }
];

export default function App() {
  const [date, setDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('daily');
  const [isMobile, setIsMobile] = useState(false);

  const [childName, setChildName] = useState(() => localStorage.getItem('child-calendar-name') || 'Campione');
  const [isEditingName, setIsEditingName] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('child-calendar-theme') || 'notebook');

  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('child-calendar-tasks')) || {});
  const [ratings, setRatings] = useState(() => JSON.parse(localStorage.getItem('child-calendar-ratings')) || {});
  const [weeklyNotes, setWeeklyNotes] = useState(() => JSON.parse(localStorage.getItem('child-calendar-notes')) || {});
  const [dailyTodos, setDailyTodos] = useState(() => JSON.parse(localStorage.getItem('child-calendar-daily-todos')) || {});
  const [dailyNotes, setDailyNotes] = useState(() => JSON.parse(localStorage.getItem('child-calendar-daily-notes')) || {});

  const [taskText, setTaskText] = useState('');
  const [taskTime, setTaskTime] = useState('08:00');
  const [selectedEmoji, setSelectedEmoji] = useState('‼️');
  const [todoText, setTodoText] = useState('');

  // Rileva se lo schermo è piccolo (Mobile)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 850);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const activeTheme = THEMES.find(t => t.id === theme) || THEMES[0];
    document.body.style.setProperty('background-color', activeTheme.bgColor, 'important');
    document.body.style.setProperty('background-image', activeTheme.bgImage, 'important');
    document.body.style.setProperty('background-repeat', 'repeat', 'important');
    document.body.style.setProperty('margin', '0', 'important');
    document.body.style.setProperty('padding', '0', 'important');
    document.body.style.setProperty('width', '100%', 'important');
    
    const rootDiv = document.getElementById('root');
    if (rootDiv) {
      rootDiv.style.setProperty('width', '100%', 'important');
      rootDiv.style.setProperty('max-width', '100%', 'important');
      rootDiv.style.setProperty('margin', '0', 'important');
      rootDiv.style.setProperty('padding', '0', 'important');
    }
    localStorage.setItem('child-calendar-theme', theme);
  }, [theme]);

  useEffect(() => localStorage.setItem('child-calendar-name', childName), [childName]);
  useEffect(() => localStorage.setItem('child-calendar-tasks', JSON.stringify(tasks)), [tasks]);
  useEffect(() => localStorage.setItem('child-calendar-ratings', JSON.stringify(ratings)), [ratings]);
  useEffect(() => localStorage.setItem('child-calendar-notes', JSON.stringify(weeklyNotes)), [weeklyNotes]);
  useEffect(() => localStorage.setItem('child-calendar-daily-todos', JSON.stringify(dailyTodos)), [dailyTodos]);
  useEffect(() => localStorage.setItem('child-calendar-daily-notes', JSON.stringify(dailyNotes)), [dailyNotes]);

  const dateKey = date.toDateString();
  const dayTasks = (tasks[dateKey] || []).sort((a, b) => a.time.localeCompare(b.time));
  const dayTodos = dailyTodos[dateKey] || [];
  const currentRating = ratings[dateKey] || 0;

  const changeMonth = (offset) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + offset);
    setDate(newDate);
  };

  const changeWeek = (offset) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + (offset * 7));
    setDate(newDate);
  };

  const goToToday = () => setDate(new Date());

  const getDaysInMonth = (currentDate) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysCount = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysCount }, (_, i) => new Date(year, month, i + 1));
  };

  const getWeekDays = (currentDate) => {
    const week = [];
    const current = new Date(currentDate);
    const day = current.getDay();
    const diff = current.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(current.setDate(diff));
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(monday);
      nextDay.setDate(monday.getDate() + i);
      week.push(nextDay);
    }
    return week;
  };

  const days = getDaysInMonth(date);
  const weekDays = getWeekDays(date);
  const currentWeekKey = weekDays[0].toDateString();

  const addTask = () => {
    if (!taskText) return;
    const newTask = { id: Date.now(), text: taskText, time: taskTime, emoji: selectedEmoji };
    setTasks({ ...tasks, [dateKey]: [...(tasks[dateKey] || []), newTask] });
    setTaskText('');
  };
  const deleteTask = (id) => setTasks({ ...tasks, [dateKey]: (tasks[dateKey] || []).filter(t => t.id !== id) });
  
  const addTodo = () => {
    if (!todoText) return;
    const newTodo = { id: Date.now(), text: todoText, done: false };
    setDailyTodos({ ...dailyTodos, [dateKey]: [...dayTodos, newTodo] });
    setTodoText('');
  };
  const toggleTodo = (id) => {
    const updatedTodos = dayTodos.map(t => t.id === id ? { ...t, done: !t.done } : t);
    setDailyTodos({ ...dailyTodos, [dateKey]: updatedTodos });
  };
  const deleteTodo = (id) => setDailyTodos({ ...dailyTodos, [dateKey]: dayTodos.filter(t => t.id !== id) });
  const rateDay = (stars) => setRatings({ ...ratings, [dateKey]: stars });

  return (
    <div style={{ 
      padding: isMobile ? '70px 10px 20px' : '60px 20px 30px', 
      fontFamily: 'sans-serif', 
      width: '100%', 
      minHeight: '100vh',
      boxSizing: 'border-box', 
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      
      {/* SELETTORE SFONDO */}
      <div style={{ 
        position: 'absolute', top: '15px', left: isMobile ? '50%' : '20px', 
        transform: isMobile ? 'translateX(-50%)' : 'none',
        display: 'flex', alignItems: 'center', gap: '8px', 
        background: 'rgba(255, 255, 255, 0.9)', padding: '6px 12px', borderRadius: '20px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backdropFilter: 'blur(5px)', zIndex: 10,
        whiteSpace: 'nowrap'
      }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#666' }}>🎨 Sfondo:</span>
        <div style={{ display: 'flex', gap: '5px' }}>
          {THEMES.map(t => (
            <button
              key={t.id} onClick={() => setTheme(t.id)} title={t.name}
              style={{
                width: '28px', height: '28px', borderRadius: '50%', border: theme === t.id ? '2px solid #ffca28' : '1px solid #ddd',
                background: t.bgColor, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.9rem', padding: 0, transition: 'all 0.2s', transform: theme === t.id ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              {t.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENITORE PRINCIPALE */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* INTESTAZIONE E SALUTO */}
        <div style={{ padding: '0 5px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: '15px', justifyContent: 'space-between', textAlign: 'center', marginTop: isMobile ? '10px' : '0' }}>
          {isEditingName ? (
            <input
              value={childName} onChange={(e) => setChildName(e.target.value)} onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingName(false); }} autoFocus maxLength={18}
              style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#333', background: 'white', border: '3px solid #fae69e', borderRadius: '18px', padding: '4px 15px', width: '80%', maxWidth: '260px', textAlign: 'center' }}
            />
          ) : (
            <h1 onClick={() => setIsEditingName(true)} style={{ margin: 0, fontSize: isMobile ? '2rem' : '2.5rem', color: '#333', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              Ciao {childName}! 👋
              <span style={{ fontSize: '0.8rem', color: '#aaa', background: 'rgba(0,0,0,0.04)', padding: '3px 6px', borderRadius: '8px', fontWeight: 'normal' }}>✏️ Modifica</span>
            </h1>
          )}

          {/* TAB DI SELEZIONE */}
          <div style={{ display: 'flex', background: 'white', padding: '4px', borderRadius: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <button onClick={() => setViewMode('daily')} style={{ padding: '8px 16px', fontSize: '1rem', fontWeight: 'bold', border: 'none', borderRadius: '15px', cursor: 'pointer', background: viewMode === 'daily' ? '#fae69e' : 'transparent', color: '#444' }}>📅 Giorno</button>
            <button onClick={() => setViewMode('weekly')} style={{ padding: '8px 16px', fontSize: '1rem', fontWeight: 'bold', border: 'none', borderRadius: '15px', cursor: 'pointer', background: viewMode === 'weekly' ? '#fae69e' : 'transparent', color: '#444' }}>🗓️ Settimana</button>
          </div>
        </div>

        {viewMode === 'daily' ? (
          /* =================== VISTA GIORNALIERA INTELLIGENTE =================== */
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '320px 1.2fr 1fr', 
            gap: isMobile ? '20px' : '25px', 
            width: '100%',
            boxSizing: 'border-box'
          }}>
            
            {/* COLONNA 1: Calendario Mensile */}
            <div style={{ width: '100%', boxSizing: 'border-box' }}>
              <div style={{ background: 'white', padding: isMobile ? '15px' : '20px', borderRadius: '30px', boxShadow: '0 8px 20px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <button onClick={() => changeMonth(-1)} style={{ padding: '8px 12px', borderRadius: '10px', border: 'none', background: '#f0f0f0', cursor: 'pointer' }}>◀</button>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#555', textTransform: 'capitalize' }}>
                    {date.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}
                  </div>
                  <button onClick={() => changeMonth(1)} style={{ padding: '8px 12px', borderRadius: '10px', border: 'none', background: '#f0f0f0', cursor: 'pointer' }}>▶</button>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '15px' }}>
                  {days.map((d, i) => (
                    <button key={i} onClick={() => setDate(d)}
                      style={{ padding: '8px 0', borderRadius: '10px', border: 'none', background: d.toDateString() === date.toDateString() ? '#fae69e' : '#f8f9fa', fontWeight: d.toDateString() === date.toDateString() ? 'bold' : 'normal', fontSize: '0.95rem', color: '#444', cursor: 'pointer', height: '36px' }}>
                      {d.getDate()}
                    </button>
                  ))}
                </div>
                <button onClick={goToToday} style={{ width: '100%', padding: '10px 0', borderRadius: '15px', border: 'none', background: '#fae69e', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', color: '#555' }}>Oggi</button>
              </div>
            </div>

            {/* COLONNA 2: L'Agenda Principale */}
            <div style={{ width: '100%', boxSizing: 'border-box' }}>
              <div style={{ background: 'white', padding: isMobile ? '15px' : '20px', borderRadius: '30px', boxShadow: '0 8px 20px rgba(0,0,0,0.04)' }}>
                <h2 style={{ margin: '0 0 15px 0', fontSize: '1.3rem', color: '#555', textTransform: 'capitalize', textAlign: 'center' }}>
                  ⏰ {date.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'short' })}
                </h2>
                
                {/* Modulo Aggiunta */}
                <div style={{ background: '#fefcfa', padding: '15px', borderRadius: '20px', marginBottom: '20px', border: '3px solid #fae69e' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <input type="time" value={taskTime} onChange={e => setTaskTime(e.target.value)} style={{ padding: '10px', borderRadius: '12px', border: '2px solid #eee', fontSize: '1rem', width: '85px' }} />
                    <input value={taskText} onChange={e => setTaskText(e.target.value)} placeholder="Cosa farai a quest'ora?" style={{ flex: 1, padding: '10px', borderRadius: '12px', border: '2px solid #eee', fontSize: '1rem', minWidth: 0 }} />
                  </div>
                  
                  {/* Griglia icone adattiva */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px', marginBottom: '12px' }}>
                    {EMOJI_LIST.map(item => (
                      <button key={item.emoji} onClick={() => setSelectedEmoji(item.emoji)} title={item.label}
                        style={{ fontSize: '1.5rem', padding: '6px', background: selectedEmoji === item.emoji ? '#fae69e' : 'transparent', border: 'none', borderRadius: '10px', cursor: 'pointer', textAlign: 'center' }}>
                        {item.emoji}
                      </button>
                    ))}
                  </div>
                  
                  <button onClick={addTask} style={{ width: '100%', padding: '12px', background: '#73d216', color: 'white', border: 'none', borderRadius: '15px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>Aggiungi all'Agenda</button>
                </div>

                {/* Lista Attività */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {dayTasks.map(task => (
                    <div key={task.id} style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', background: '#f8f9fa', borderRadius: '15px', borderLeft: '5px solid #fae69e' }}>
                      <span style={{ fontSize: '2rem', marginRight: '12px' }}>{task.emoji}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.85rem', color: '#aaa', fontWeight: 'bold' }}>{task.time}</div>
                        <div style={{ fontSize: '1.1rem', color: '#444', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{task.text}</div>
                      </div>
                      <button onClick={() => deleteTask(task.id)} style={{ background: '#fceaea', color: '#cc0000', border: 'none', padding: '8px 12px', borderRadius: '10px', cursor: 'pointer' }}>🗑️</button>
                    </div>
                  ))}
                  {dayTasks.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#aaa', fontSize: '1rem', padding: '15px', fontStyle: 'italic' }}>Agenda vuota! 🎉</div>
                  )}
                </div>
              </div>
            </div>

            {/* COLONNA 3: Checklist, Note e Stelline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', boxSizing: 'border-box' }}>
              
              {/* Checklist */}
              <div style={{ background: 'white', padding: '20px', borderRadius: '30px', boxShadow: '0 8px 20px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '1.1rem', color: '#555', fontWeight: 'bold', marginBottom: '12px' }}>✅ Cose da fare</div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
                  <input value={todoText} onChange={e => setTodoText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') addTodo(); }} placeholder="Es: Compiti..." style={{ flex: 1, padding: '10px', borderRadius: '12px', border: '2px solid #eee', fontSize: '1rem', minWidth: 0 }} />
                  <button onClick={addTodo} style={{ background: '#3498db', color: 'white', border: 'none', borderRadius: '12px', padding: '0 15px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}>+</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {dayTodos.map(todo => (
                    <div key={todo.id} style={{ display: 'flex', alignItems: 'center', padding: '10px', background: todo.done ? '#f4fbf0' : '#f8f9fa', borderRadius: '12px' }}>
                      <div onClick={() => toggleTodo(todo.id)} style={{ width: '24px', height: '24px', borderRadius: '6px', border: '2px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: todo.done ? '#73d216' : 'white', borderColor: todo.done ? '#73d216' : '#ccc', flexShrink: 0 }}>
                        {todo.done && <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>✓</span>}
                      </div>
                      <div style={{ flex: 1, marginLeft: '10px', fontSize: '1.05rem', color: todo.done ? '#999' : '#444', textDecoration: todo.done ? 'line-through' : 'none', overflow: 'hidden', textOverflow: 'ellipsis' }}>{todo.text}</div>
                      <button onClick={() => deleteTodo(todo.id)} style={{ background: 'transparent', color: '#bbb', border: 'none', fontSize: '1rem', cursor: 'pointer' }}>✖</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spazio Libero Diario */}
              <div style={{ background: 'white', padding: '20px', borderRadius: '30px', boxShadow: '0 8px 20px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '1.1rem', color: '#555', fontWeight: 'bold', marginBottom: '10px' }}>✍️ Spazio Libero Appunti</div>
                <textarea value={dailyNotes[dateKey] || ''} onChange={(e) => setDailyNotes({ ...dailyNotes, [dateKey]: e.target.value })} placeholder="Scrivi quello che vuoi..." style={{ width: '100%', minHeight: '80px', padding: '12px', borderRadius: '12px', border: '2px dashed #ccc', fontSize: '1rem', boxSizing: 'border-box', resize: 'none', outline: 'none', background: '#fafafa' }} />
              </div>

              {/* Stelline Valutazione */}
              <div style={{ background: 'white', padding: '15px', borderRadius: '30px', boxShadow: '0 8px 20px rgba(0,0,0,0.04)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', color: '#555', fontWeight: 'bold', marginBottom: '10px' }}>Com'è andata oggi?</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} onClick={() => rateDay(star)} style={{ background: 'none', border: 'none', fontSize: '2.5rem', cursor: 'pointer', color: star <= currentRating ? '#FFD700' : '#e0e0e0' }}>★</button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* =================== VISTA SETTIMANALE ADATTIVA =================== */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '15px 20px', borderRadius: '20px', boxShadow: '0 8px 20px rgba(0,0,0,0.04)' }}>
              <button onClick={() => changeWeek(-1)} style={{ padding: '8px 12px', borderRadius: '10px', border: 'none', background: '#f0f0f0', cursor: 'pointer' }}>◀</button>
              <div style={{ textAlign: 'center', fontSize: isMobile ? '0.95rem' : '1.2rem', fontWeight: 'bold', color: '#555' }}>
                {weekDays[0].getDate()} {weekDays[0].toLocaleDateString('it-IT', {month: 'short'})} - {weekDays[6].getDate()} {weekDays[6].toLocaleDateString('it-IT', {month: 'short', year: 'numeric'})}
              </div>
              <button onClick={() => changeWeek(1)} style={{ padding: '8px 12px', borderRadius: '10px', border: 'none', background: '#f0f0f0', cursor: 'pointer' }}>▶</button>
            </div>

            {/* Su mobile mette i giorni in colonna verticale singola */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(7, 1fr)', gap: '10px' }}>
              {weekDays.map(day => {
                const dKey = day.toDateString();
                const dTasks = (tasks[dKey] || []).sort((a, b) => a.time.localeCompare(b.time));
                const dTodos = dailyTodos[dKey] || [];
                const isToday = day.toDateString() === new Date().toDateString();

                return (
                  <div key={dKey} onClick={() => { setDate(day); setViewMode('daily'); }}
                    style={{ background: 'white', borderRadius: '20px', padding: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: isToday ? '3px solid #fae69e' : '3px solid transparent', display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: isMobile ? 'center' : 'stretch', gap: '10px', cursor: 'pointer' }}
                  >
                    <div style={{ textAlign: 'center', borderBottom: isMobile ? 'none' : '2px dashed #eee', borderRight: isMobile ? '2px dashed #eee' : 'none', paddingBottom: isMobile ? '0' : '6px', paddingRight: isMobile ? '10px' : '0', minWidth: isMobile ? '70px' : 'auto' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#888', textTransform: 'capitalize' }}>{day.toLocaleDateString('it-IT', { weekday: 'short' })}</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: isToday ? '#e6b800' : '#444' }}>{day.getDate()}</div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', flex: 1, flexWrap: 'wrap' }}>
                      {dTasks.map(t => (
                        <div key={t.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#f9f9f9', padding: '4px 8px', borderRadius: '8px', fontSize: '0.85rem' }}>
                          <span>{t.emoji}</span>
                          <span style={{ fontWeight: 'bold', color: '#777' }}>{t.time}</span>
                        </div>
                      ))}
                      {dTodos.length > 0 && (
                        <div style={{ padding: '4px 8px', background: '#f4fbf0', borderRadius: '8px', fontSize: '0.8rem', color: '#555', fontWeight: 'bold' }}>✅ {dTodos.filter(t => t.done).length}/{dTodos.length}</div>
                      )}
                      {dTasks.length === 0 && dTodos.length === 0 && (
                        <span style={{ color: '#ccc', fontSize: '0.85rem', fontStyle: 'italic' }}>Libero</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div style={{ background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 8px 20px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#555', marginBottom: '10px' }}>📝 Note della settimana</div>
              <textarea value={weeklyNotes[currentWeekKey] || ''} onChange={(e) => setWeeklyNotes({ ...weeklyNotes, [currentWeekKey]: e.target.value })} placeholder="Ricorda le cose importanti..." style={{ width: '100%', minHeight: '80px', padding: '12px', borderRadius: '12px', border: '3px dashed #fae69e', fontSize: '1.1rem', boxSizing: 'border-box', outline: 'none', background: '#fffef7', resize: 'none' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}