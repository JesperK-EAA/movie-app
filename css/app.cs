* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
}

header {
  text-align: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.2);
}

header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 2rem;
}

.counter-box {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
}

.counter-box h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.instructions {
  font-size: 0.95rem;
  opacity: 0.8;
  margin-bottom: 2rem;
}

.count-display {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

#counter {
  font-size: 4rem;
  font-weight: bold;
  color: #ffd700;
  display: block;
  margin: 1rem 0;
}

button {
  background: white;
  color: #667eea;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  margin: 0.5rem;
  transition: all 0.3s;
  font-weight: bold;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

button:active {
  transform: translateY(0);
}

#reset-button {
  background: #ff6b6b;
  color: white;
}

#reset-button:hover {
  background: #ff5252;
}