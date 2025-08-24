
// components/AnniversaryEffect.tsx
import { motion } from 'framer-motion';
import { FC } from 'react';
import { IntertwinedHeartsIcon } from './icons';

interface AnniversaryEffectProps {
    show: boolean;
}

const AnniversaryEffect: FC<AnniversaryEffectProps> = ({ show }) => {
    if (!show) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[100]"
        >
            <div className="text-center p-8 rounded-2xl bg-white/10 border border-white/20 shadow-2xl">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1, 1.2, 1],
                        transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                    }}
                >
                    <IntertwinedHeartsIcon className="w-24 h-24 text-rose-400 mx-auto" />
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="text-3xl md:text-4xl font-script text-white mt-6"
                >
                    Feliz 1 Ano de Casamento!
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 1 }}
                    className="text-white/80 mt-2"
                >
                    Que venham muitos mais anos de amor e felicidade.
                </motion.p>
            </div>
        </motion.div>
    );
};

export default AnniversaryEffect;
