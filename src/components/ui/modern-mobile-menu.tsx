import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Home, Briefcase, FlaskConical, Mail } from 'lucide-react';

type IconComponentType = React.ElementType<{ className?: string }>;

export interface InteractiveMenuItem {
  label: string;
  icon: IconComponentType;
  href?: string;
}

export interface InteractiveMenuProps {
  items?: InteractiveMenuItem[];
  accentColor?: string;
}

const defaultItems: InteractiveMenuItem[] = [
  { label: 'home',     icon: Home,         href: '#top' },
  { label: 'research', icon: FlaskConical, href: '#research' },
  { label: 'work',     icon: Briefcase,    href: '#work' },
  { label: 'contact',  icon: Mail,         href: '#contact' },
];

const InteractiveMenu: React.FC<InteractiveMenuProps> = ({ items, accentColor = 'rgb(34,211,238)' }) => {
  const finalItems = useMemo(() => {
    const isValid = items && Array.isArray(items) && items.length >= 2 && items.length <= 5;
    return isValid ? items! : defaultItems;
  }, [items]);

  const [activeIndex, setActiveIndex] = useState(0);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (activeIndex >= finalItems.length) setActiveIndex(0);
  }, [finalItems, activeIndex]);

  useEffect(() => {
    const setLineWidth = () => {
      const activeItem = itemRefs.current[activeIndex];
      const activeText = textRefs.current[activeIndex];
      if (activeItem && activeText) {
        activeItem.style.setProperty('--lineWidth', `${activeText.offsetWidth}px`);
      }
    };
    setLineWidth();
    window.addEventListener('resize', setLineWidth);
    return () => window.removeEventListener('resize', setLineWidth);
  }, [activeIndex, finalItems]);

  const handleItemClick = (index: number, href?: string) => {
    setActiveIndex(index);
    if (href) {
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="menu"
      role="navigation"
      style={{ '--component-active-color': accentColor } as React.CSSProperties}
    >
      {finalItems.map((item, index) => {
        const isActive = index === activeIndex;
        const IconComponent = item.icon;
        return (
          <button
            key={item.label}
            className={`menu__item ${isActive ? 'active' : ''}`}
            onClick={() => handleItemClick(index, item.href)}
            ref={(el) => (itemRefs.current[index] = el)}
            style={{ '--lineWidth': '0px' } as React.CSSProperties}
          >
            <div className="menu__icon">
              <IconComponent className="icon" />
            </div>
            <strong
              className={`menu__text ${isActive ? 'active' : ''}`}
              ref={(el) => (textRefs.current[index] = el)}
            >
              {item.label}
            </strong>
          </button>
        );
      })}
    </nav>
  );
};

export { InteractiveMenu };
