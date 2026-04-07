// Virtual touch controls for mobile devices
// Dispatches keyboard events so the existing input system works unchanged

export function initTouchControls() {
  if (!('ontouchstart' in window)) return;

  const fireKey = (code, type) => {
    document.dispatchEvent(new KeyboardEvent(type, {
      keyCode: code,
      bubbles: true,
    }));
  };

  // --- Joystick (left side) ---
  const joystickArea = document.createElement('div');
  joystickArea.id = 'joystick-area';
  Object.assign(joystickArea.style, {
    position: 'fixed', left: '20px', bottom: '20px',
    width: '150px', height: '150px',
    borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)',
    background: 'rgba(255,255,255,0.05)',
    zIndex: '9999', touchAction: 'none',
  });

  const joystickKnob = document.createElement('div');
  joystickKnob.id = 'joystick-knob';
  Object.assign(joystickKnob.style, {
    position: 'absolute',
    left: '50%', top: '50%',
    width: '60px', height: '60px',
    marginLeft: '-30px', marginTop: '-30px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.4)',
    transition: 'none',
  });
  joystickArea.appendChild(joystickKnob);
  document.body.appendChild(joystickArea);

  // --- Fire button (right side) ---
  const fireBtn = document.createElement('div');
  fireBtn.id = 'fire-btn';
  fireBtn.textContent = 'FIRE';
  Object.assign(fireBtn.style, {
    position: 'fixed', right: '30px', bottom: '50px',
    width: '90px', height: '90px',
    borderRadius: '50%', border: '2px solid rgba(255,50,50,0.5)',
    background: 'rgba(255,50,50,0.2)',
    color: 'rgba(255,255,255,0.7)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '16px', fontFamily: 'Odibee Sans, sans-serif',
    zIndex: '9999', touchAction: 'none', userSelect: 'none',
  });
  document.body.appendChild(fireBtn);

  // --- Joystick logic ---
  const activeKeys = { w: false, a: false, s: false, d: false };
  const radius = 75;
  const deadzone = 15;

  function updateKeys(dx, dy) {
    const newKeys = {
      w: dy < -deadzone,
      s: dy > deadzone,
      a: dx < -deadzone,
      d: dx > deadzone,
    };

    const keyMap = { w: 87, a: 65, s: 83, d: 68 };

    for (const key in newKeys) {
      if (newKeys[key] && !activeKeys[key]) {
        fireKey(keyMap[key], 'keydown');
        activeKeys[key] = true;
      } else if (!newKeys[key] && activeKeys[key]) {
        fireKey(keyMap[key], 'keyup');
        activeKeys[key] = false;
      }
    }
  }

  function resetJoystick() {
    joystickKnob.style.marginLeft = '-30px';
    joystickKnob.style.marginTop = '-30px';
    for (const key in activeKeys) {
      if (activeKeys[key]) {
        const keyMap = { w: 87, a: 65, s: 83, d: 68 };
        fireKey(keyMap[key], 'keyup');
        activeKeys[key] = false;
      }
    }
  }

  let joystickTouchId = null;

  joystickArea.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    joystickTouchId = touch.identifier;
  }, { passive: false });

  joystickArea.addEventListener('touchmove', (e) => {
    e.preventDefault();
    for (const touch of e.changedTouches) {
      if (touch.identifier !== joystickTouchId) continue;
      const rect = joystickArea.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let dx = touch.clientX - cx;
      let dy = touch.clientY - cy;

      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > radius) {
        dx = (dx / dist) * radius;
        dy = (dy / dist) * radius;
      }

      joystickKnob.style.marginLeft = (dx - 30) + 'px';
      joystickKnob.style.marginTop = (dy - 30) + 'px';
      updateKeys(dx, dy);
    }
  }, { passive: false });

  joystickArea.addEventListener('touchend', (e) => {
    for (const touch of e.changedTouches) {
      if (touch.identifier === joystickTouchId) {
        joystickTouchId = null;
        resetJoystick();
      }
    }
  });

  joystickArea.addEventListener('touchcancel', () => {
    joystickTouchId = null;
    resetJoystick();
  });

  // --- Fire button logic ---
  fireBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    fireKey(32, 'keydown');
    fireBtn.style.background = 'rgba(255,50,50,0.5)';
  }, { passive: false });

  fireBtn.addEventListener('touchend', (e) => {
    e.preventDefault();
    fireKey(32, 'keyup');
    fireBtn.style.background = 'rgba(255,50,50,0.2)';
  }, { passive: false });

  fireBtn.addEventListener('touchcancel', () => {
    fireKey(32, 'keyup');
    fireBtn.style.background = 'rgba(255,50,50,0.2)';
  });
}
