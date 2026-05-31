import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Home, Briefcase, RefreshCw, Mail, FlaskConical } from 'lucide-react';

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
  { label: 'home',     icon: Home,          href: '#home' },
  { label: 'work',     icon: Briefcase,     href: '#work' },
  { label: 'process',  icon: RefreshCw,     href: '#process' },
  { label: 'contact',  icon: Mail,          href: '#contact' },
  { label: 'research', icon: FlaskConical,  href: '/portfolio/research/index.html' },
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
    if (!href) return;
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = href;
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
        const isExternal = item.href && !item.href.startsWith('#');
        const commonProps = {
          key: item.label,
          className: `menu__item ${isActive ? 'active' : ''}`,
          style: { '--lineWidth': '0px' } as React.CSSProperties,
          ref: (el: any) => (itemRefs.current[index] = el),
        };
        const inner = (
          <>
            <div className="menu__icon"><IconComponent className="icon" /></div>
            <strong className={`menu__text ${isActive ? 'active' : ''}`} ref={(el) => (textRefs.current[index] = el)}>
              {item.label}
            </strong>
          </>
        );
        return isExternal ? (
          <a {...commonProps} href={item.href} onClick={() => setActiveIndex(index)}>
            {inner}
          </a>
        ) : (
          <button {...commonProps} onClick={() => handleItemClick(index, item.href)}>
            {inner}
          </button>
        );
      })}
    </nav>
  );
};

export { InteractiveMenu };
