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

  const [childName, setChildName] = useState(() => {
    return localStorage.getItem('child-calendar-name') || 'Campione';
  });
  const [isEditingName, setIsEditingName] = useState(false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('child-calendar-theme') || 'notebook';
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('child-calendar-tasks');
    return saved ? JSON.parse(saved) : {};
  });

  const [ratings, setRatings] = useState(() => {
    const saved = localStorage.getItem('child-calendar-ratings');
    return saved ? JSON.parse(saved) : {};
  });

  const [weeklyNotes, setWeeklyNotes] = useState(() => {
    const saved = localStorage.getItem('child-calendar-notes');
    return saved ? JSON.parse(saved) : {};
  });

  const [dailyTodos, setDailyTodos] = useState(() => {
    const saved = localStorage.getItem('child-calendar-daily-todos');
    return saved ? JSON.parse(saved) : {};
  });

  const [dailyNotes, setDailyNotes] = useState(() => {
    const saved = localStorage.getItem('child-calendar-daily-notes');
    return saved ? JSON.parse(saved) : {};
  });

  const [taskText, setTaskText] = useState('');
  const [taskTime, setTaskTime] = useState('08:00');
  const [selectedEmoji, setSelectedEmoji] = useState('‼️');
  
  const [todoText, setTodoText] = useState('');

  useEffect(() => {
    const activeTheme = THEMES.find(t => t.id === theme) || THEMES[0];
    document.body.style.setProperty('background-color', activeTheme.bgColor, 'important');
    document.body.style.setProperty('background-image', activeTheme.bgImage, 'important');
    document.body.style.setProperty('background-repeat', 'repeat', 'important');
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
  const deleteTodo = (id) => {
    setDailyTodos({ ...dailyTodos, [dateKey]: dayTodos.filter(t => t.id !== id) });
  };

  const rateDay = (stars) => setRatings({ ...ratings, [dateKey]: stars });

  return (
    <div style={{ padding: '60px 20px 30px', fontFamily: 'sans-serif', width: '100%', boxSizing: 'border-box', position: 'relative' }}>
      
      {/* SELETTORE SFONDO */}
      <div style={{ 
        position: 'absolute', top: '15px', left: '20px', display: 'flex', alignItems: 'center', gap: '10px', 
        background: 'rgba(255, 255, 255, 0.85)', padding: '6px 12px', borderRadius: '20px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backdropFilter: 'blur(5px)', zIndex: 10
      }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#666' }}>🎨 Sfondo:</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {THEMES.map(t => (
            <button
              key={t.id} onClick={() => setTheme(t.id)} title={t.name}
              style={{
                width: '30px', height: '30px', borderRadius: '50%', border: theme === t.id ? '2px solid #ffca28' : '1px solid #ddd',
                background: t.bgColor, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', padding: 0, transition: 'all 0.2s', transform: theme === t.id ? 'scale(1.15)' : 'scale(1)',
                boxShadow: theme === t.id ? '0 2px 6px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {t.emoji}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* INTESTAZIONE E SALUTO ALLINEATI CON IL CONTENUTO BILANCIATO */}
        <div style={{ padding: '0 10px', minHeight: '55px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between' }}>
          {isEditingName ? (
            <input
              value={childName} onChange={(e) => setChildName(e.target.value)} onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingName(false); }} autoFocus maxLength={18}
              style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#333', background: 'white', border: '3px solid #fae69e', borderRadius: '18px', padding: '4px 15px', maxWidth: '300px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
            />
          ) : (
            <h1 onClick={() => setIsEditingName(true)} style={{ margin: 0, fontSize: '2.6rem', color: '#333', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '12px', userSelect: 'none' }} title="Clicca qui per cambiare il nome!">
              Ciao {childName}! 👋
              <span style={{ fontSize: '1.1rem', color: '#aaa', background: 'rgba(0,0,0,0.04)', padding: '4px 8px', borderRadius: '10px', fontWeight: 'normal' }}>✏️ Cambia nome</span>
            </h1>
          )}

          {/* TAB DI SELEZIONE */}
          <div style={{ display: 'flex', background: 'white', padding: '5px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
            <button 
              onClick={() => setViewMode('daily')}
              style={{ padding: '10px 20px', fontSize: '1.1rem', fontWeight: 'bold', border: 'none', borderRadius: '15px', cursor: 'pointer', transition: '0.2s',
                background: viewMode === 'daily' ? '#fae69e' : 'transparent', color: viewMode === 'daily' ? '#444' : '#888'
              }}>📅 Giorno</button>
            <button 
              onClick={() => setViewMode('weekly')}
              style={{ padding: '10px 20px', fontSize: '1.1rem', fontWeight: 'bold', border: 'none', borderRadius: '15px', cursor: 'pointer', transition: '0.2s',
                background: viewMode === 'weekly' ? '#fae69e' : 'transparent', color: viewMode === 'weekly' ? '#444' : '#888'
              }}>🗓️ Settimana</button>
          </div>
        </div>

        {viewMode === 'daily' ? (
          /* =================== VISTA GIORNALIERA CENTRATA =================== */
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '340px 1.3fr 1fr', gap: '30px', alignItems: 'start', width: '100%', maxWidth: '1400px' }}>
              
              {/* ⬅️ COLONNA 1: Navigazione e Calendario Protetto */}
              <div style={{ width: '100%' }}>
                <div style={{ background: 'white', padding: '25px', borderRadius: '40px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <button onClick={() => changeMonth(-1)} style={{ padding: '10px 15px', borderRadius: '12px', border: 'none', background: '#f0f0f0', fontSize: '1.1rem', cursor: 'pointer' }}>◀</button>
                    <div style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: '#555', textTransform: 'capitalize' }}>
                      {date.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}
                    </div>
                    <button onClick={() => changeMonth(1)} style={{ padding: '10px 15px', borderRadius: '12px', border: 'none', background: '#f0f0f0', fontSize: '1.1rem', cursor: 'pointer' }}>▶</button>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', marginBottom: '20px' }}>
                    {days.map((d, i) => (
                      <button key={i} onClick={() => setDate(d)}
                        style={{ padding: '10px 0', borderRadius: '12px', border: 'none', background: d.toDateString() === date.toDateString() ? '#fae69e' : '#f8f9fa', fontWeight: d.toDateString() === date.toDateString() ? 'bold' : 'normal', fontSize: '1.05rem', color: '#444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px' }}>
                        {d.getDate()}
                      </button>
                    ))}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <button onClick={goToToday} style={{ width: '100%', padding: '12px 0', borderRadius: '20px', border: 'none', background: '#fae69e', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', color: '#555', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>Torniamo a OGGI</button>
                  </div>
                </div>
              </div>

              {/* 👑 COLONNA 2: L'Agenda principale */}
              <div style={{ width: '100%' }}>
                <div style={{ background: 'white', padding: '25px', borderRadius: '40px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                  <h2 style={{ margin: '0 0 20px 0', fontSize: '1.5rem', color: '#555', textTransform: 'capitalize', textAlign: 'center' }}>
                    ⏰ Agenda del {date.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </h2>
                  
                  {/* Modulo Aggiunta Impegni con Orario */}
                  <div style={{ background: '#fefcfa', padding: '20px', borderRadius: '25px', marginBottom: '25px', border: '4px solid #fae69e' }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                      <input type="time" value={taskTime} onChange={e => setTaskTime(e.target.value)} style={{ padding: '12px', borderRadius: '15px', border: '2px solid #eee', fontSize: '1.1rem', width: '100px' }} />
                      <input value={taskText} onChange={e => setTaskText(e.target.value)} placeholder="Cosa devi fare ad un orario preciso?" style={{ flex: 1, padding: '12px', borderRadius: '15px', border: '2px solid #eee', fontSize: '1.1rem' }} />
                    </div>
                    
                    {/* Carosello Emoji */}
                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '15px', paddingBottom: '5px' }}>
                      {EMOJI_LIST.map(item => (
                        <button 
                          key={item.emoji} 
                          onClick={() => setSelectedEmoji(item.emoji)} 
                          title={item.label}
                          style={{ fontSize: '1.8rem', padding: '8px', background: selectedEmoji === item.emoji ? '#fae69e' : 'transparent', border: 'none', borderRadius: '15px', cursor: 'pointer', flexShrink: 0 }}
                        >
                          {item.emoji}
                        </button>
                      ))}
                    </div>
                    
                    <button onClick={addTask} style={{ width: '100%', padding: '15px', background: '#73d216', color: 'white', border: 'none', borderRadius: '20px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}>Aggiungi all'Agenda</button>
                  </div>

                  {/* Lista Attività in Agenda */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {dayTasks.map(task => (
                      <div key={task.id} style={{ display: 'flex', alignItems: 'center', padding: '15px 20px', background: '#f8f9fa', borderRadius: '20px', borderLeft: '5px solid #fae69e', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                        <span style={{ fontSize: '2.5rem', marginRight: '15px' }}>{task.emoji}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '1rem', color: '#a0a0a0', fontWeight: 'bold', marginBottom: '2px' }}>{task.time}</div>
                          <div style={{ fontSize: '1.4rem', color: '#444' }}>{task.text}</div>
                        </div>
                        <button onClick={() => deleteTask(task.id)} style={{ background: '#fceaea', color: '#cc0000', border: 'none', padding: '10px 15px', borderRadius: '15px', fontSize: '1.2rem', cursor: 'pointer' }}>🗑️</button>
                      </div>
                    ))}
                    {dayTasks.length === 0 && (
                      <div style={{ textAlign: 'center', color: '#aaa', fontSize: '1.1rem', padding: '20px', fontStyle: 'italic' }}>
                        Agenda vuota per oggi! 🎉
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ➡️ COLONNA 3: Checklist, Note e Stelline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                
                {/* Checklist */}
                <div style={{ background: 'white', padding: '25px', borderRadius: '40px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '1.3rem', color: '#555', fontWeight: 'bold', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    ✅ Cose da fare (Checklist)
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <input 
                      value={todoText} onChange={e => setTodoText(e.target.value)} 
                      onKeyDown={(e) => { if (e.key === 'Enter') addTodo(); }}
                      placeholder="Es: Fare i compiti..." 
                      style={{ flex: 1, padding: '12px 15px', borderRadius: '15px', border: '2px solid #eee', fontSize: '1.1rem' }} 
                    />
                    <button onClick={addTodo} style={{ background: '#3498db', color: 'white', border: 'none', borderRadius: '15px', padding: '0 20px', fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer' }}>+</button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {dayTodos.map(todo => (
                      <div key={todo.id} style={{ display: 'flex', alignItems: 'center', padding: '12px 15px', background: todo.done ? '#f4fbf0' : '#f8f9fa', borderRadius: '15px', border: todo.done ? '1px solid #d4efc6' : '1px solid transparent' }}>
                        <div 
                          onClick={() => toggleTodo(todo.id)}
                          style={{ width: '28px', height: '28px', borderRadius: '8px', border: '3px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: todo.done ? '#73d216' : 'white', borderColor: todo.done ? '#73d216' : '#ccc', flexShrink: 0 }}
                        >
                          {todo.done && <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', marginLeft: '3px' }}>✓</span>}
                        </div>
                        <div style={{ flex: 1, marginLeft: '15px', fontSize: '1.2rem', color: todo.done ? '#999' : '#444', textDecoration: todo.done ? 'line-through' : 'none' }}>
                          {todo.text}
                        </div>
                        <button onClick={() => deleteTodo(todo.id)} style={{ background: 'transparent', color: '#bbb', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✖</button>
                      </div>
                    ))}
                    {dayTodos.length === 0 && (
                      <div style={{ color: '#bbb', fontStyle: 'italic', fontSize: '1rem', textAlign: 'center', padding: '5px 0' }}>Nessun compito aggiunto.</div>
                    )}
                  </div>
                </div>

                {/* Spazio Libero Appunti */}
                <div style={{ background: 'white', padding: '25px', borderRadius: '40px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '1.3rem', color: '#555', fontWeight: 'bold', marginBottom: '15px' }}>
                    ✍️ Spazio libero del giorno
                  </div>
                  <textarea
                    value={dailyNotes[dateKey] || ''}
                    onChange={(e) => setDailyNotes({ ...dailyNotes, [dateKey]: e.target.value })}
                    placeholder="Scrivi qui quello che vuoi!"
                    style={{ width: '100%', minHeight: '90px', padding: '15px', borderRadius: '15px', border: '2px dashed #ccc', fontSize: '1.1rem', fontFamily: 'sans-serif', color: '#444', boxSizing: 'border-box', resize: 'vertical', outline: 'none', background: '#fafafa' }}
                  />
                </div>

                {/* Stelline */}
                <div style={{ background: 'white', padding: '25px 20px', borderRadius: '40px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.4rem', color: '#555', fontWeight: 'bold', marginBottom: '15px' }}>Com'è andata oggi?</div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} onClick={() => rateDay(star)}
                        style={{ background: 'none', border: 'none', fontSize: '3.5rem', cursor: 'pointer', color: star <= currentRating ? '#FFD700' : '#e0e0e0', padding: '0 4px', transition: 'all 0.2s', transform: star <= currentRating ? 'scale(1.1)' : 'scale(1)' }}>★</button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        ) : (
          /* =================== VISTA SETTIMANALE CENTRATA =================== */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '20px 30px', borderRadius: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
              <button onClick={() => changeWeek(-1)} style={{ padding: '10px 20px', borderRadius: '15px', border: 'none', background: '#f0f0f0', fontSize: '1.2rem', cursor: 'pointer' }}>◀</button>
              <div style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#555' }}>
                Settimana dal {weekDays[0].getDate()} {weekDays[0].toLocaleDateString('it-IT', {month: 'short'})} al {weekDays[6].getDate()} {weekDays[6].toLocaleDateString('it-IT', {month: 'short', year: 'numeric'})}
              </div>
              <button onClick={() => changeWeek(1)} style={{ padding: '10px 20px', borderRadius: '15px', border: 'none', background: '#f0f0f0', fontSize: '1.2rem', cursor: 'pointer' }}>▶</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '15px' }}>
              {weekDays.map(day => {
                const dKey = day.toDateString();
                const dTasks = (tasks[dKey] || []).sort((a, b) => a.time.localeCompare(b.time));
                const dTodos = dailyTodos[dKey] || [];
                const isToday = day.toDateString() === new Date().toDateString();

                return (
                  <div key={dKey} onClick={() => { setDate(day); setViewMode('daily'); }}
                    style={{ background: 'white', borderRadius: '25px', padding: '20px', boxShadow: '0 8px 20px rgba(0,0,0,0.04)', border: isToday ? '3px solid #fae69e' : '3px solid transparent', display: 'flex', flexDirection: 'column', gap: '15px', cursor: 'pointer', transition: '0.2s' }}
                  >
                    <div style={{ textAlign: 'center', borderBottom: '2px dashed #eee', paddingBottom: '10px' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#888', textTransform: 'capitalize' }}>{day.toLocaleDateString('it-IT', { weekday: 'long' })}</div>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: isToday ? '#e6b800' : '#444' }}>{day.getDate()}</div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                      {dTasks.map(t => (
                        <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f9f9f9', padding: '6px', borderRadius: '10px' }}>
                          <span style={{ fontSize: '1.2rem' }}>{t.emoji}</span>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.75rem', color: '#999', fontWeight: 'bold' }}>{t.time}</span>
                            <span style={{ fontSize: '0.9rem', color: '#333' }}>{t.text}</span>
                          </div>
                        </div>
                      ))}
                      
                      {dTodos.length > 0 && (
                        <div style={{ marginTop: '5px', padding: '6px', background: '#f4fbf0', borderRadius: '10px', fontSize: '0.85rem', color: '#555' }}>
                          ✅ {dTodos.filter(t => t.done).length}/{dTodos.length} compiti
                        </div>
                      )}

                      {dTasks.length === 0 && dTodos.length === 0 && (
                        <div style={{ textAlign: 'center', color: '#ccc', fontSize: '0.9rem', fontStyle: 'italic', marginTop: '10px' }}>Libero!</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div style={{ background: 'white', padding: '30px', borderRadius: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', marginTop: '10px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#555', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                📝 Note della settimana
              </div>
              <textarea
                value={weeklyNotes[currentWeekKey] || ''}
                onChange={(e) => setWeeklyNotes({ ...weeklyNotes, [currentWeekKey]: e.target.value })}
                placeholder="Scrivi qui le cose importanti da ricordare questa settimana..."
                style={{ width: '100%', minHeight: '120px', padding: '20px', borderRadius: '20px', border: '3px dashed #fae69e', fontSize: '1.2rem', fontFamily: 'sans-serif', color: '#444', boxSizing: 'border-box', resize: 'vertical', outline: 'none', background: '#fffef7' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}