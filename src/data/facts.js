// Historical fact database.
// Each entry: { headline, body, source?, type }
// Types: 'deploy' | 'death' | 'tower' | 'scenario' | 'outcome'

export const facts = {
  // ─── WESTERN FRONT SCENARIO ────────────────────────────────────────────────

  'scenario-western-front': {
    headline: 'THE WAR TO END ALL WARS',
    body: 'On 28 June 1914, Archduke Franz Ferdinand of Austria-Hungary was assassinated in Sarajevo by Gavrilo Princip. Within weeks, a complex web of alliances had dragged every major European power into war. No one expected it to last four years.',
    source: 'MacMillan, The War That Ended Peace (2013)',
    type: 'scenario',
  },
  'outcome-western-front': {
    headline: 'THE ARMISTICE',
    body: 'At 11am on 11 November 1918, the guns fell silent. The Western Front had cost over 4 million lives. Germany, having signed the armistice, would later argue it was "stabbed in the back" — a myth Hitler would exploit to devastating effect.',
    source: 'Keegan, The First World War (1998)',
    type: 'outcome',
  },

  'tommy-soldier-deploy': {
    headline: '"TOMMY" — THE BRITISH SOLDIER',
    body: '"Tommy Atkins" was slang for the average British soldier, a name used since at least the 1700s. By 1914, the British Expeditionary Force had 6 regular divisions — tiny compared to Germany\'s 87. Yet the BEF was arguably the best-trained army in the war.',
    source: 'Holmes, Tommy: The British Soldier on the Western Front (2004)',
    type: 'deploy',
  },
  'tommy-soldier-death': {
    headline: 'THE COST OF WAR',
    body: 'Britain lost 886,000 soldiers killed in WWI — approximately one in eight of all who served. The Battle of the Somme on 1 July 1916 saw 57,470 British casualties in a single day, the worst in British military history.',
    type: 'death',
  },
  'field-medic-deploy': {
    headline: 'THE ROYAL ARMY MEDICAL CORPS',
    body: 'The RAMC treated over 7 million casualties during WWI. Stretcher bearers often risked — and lost — their lives recovering the wounded from no-man\'s land. Five RAMC members won the Victoria Cross for bravery under fire.',
    source: 'Whitehead, Doctors in the Great War (1999)',
    type: 'deploy',
  },
  'machine-gunner-deploy': {
    headline: 'THE VICKERS: KILLING MACHINE',
    body: 'The Vickers machine gun could fire 450-500 rounds per minute and, if kept water-cooled, could fire continuously for hours. On 24 August 1916, a single battalion of the Machine Gun Corps fired over 1 million rounds in 12 hours at the Battle of High Wood.',
    type: 'deploy',
  },
  'gas-mask-deploy': {
    headline: 'THE AGE OF CHEMICAL WARFARE',
    body: 'Germany first used chlorine gas on a large scale at the Second Battle of Ypres on 22 April 1915. 168 tonnes of gas were released, killing thousands and driving a 4-mile gap in Allied lines. Both sides quickly developed primitive gas masks — cloth soaked in urine was the first.',
    source: 'Haber, The Poisonous Cloud (1986)',
    type: 'deploy',
  },
  'rfc-biplane-deploy': {
    headline: 'WAR COMES TO THE SKY',
    body: 'When WWI began, aircraft were barely a decade old. By 1918, the RAF (formed April 1918 from the RFC) had 22,000 aircraft and 300,000 personnel. Fighter aces like Manfred von Richthofen (the Red Baron, 80 victories) became celebrities on both sides.',
    type: 'deploy',
  },
  'field-artillery-deploy': {
    headline: 'ARTILLERY: THE REAL KILLER',
    body: 'Artillery caused approximately 60% of all WWI casualties. The bombardment before the Battle of the Somme lasted seven days and fired 1.7 million shells — yet it barely cut the German barbed wire. The Germans simply sheltered in deep bunkers and waited.',
    type: 'deploy',
  },
  'general-haig-deploy': {
    headline: 'FIELD MARSHAL HAIG: HERO OR BUTCHER?',
    body: 'Douglas Haig commanded the British forces on the Western Front from December 1915. He is credited with the Hundred Days Offensive that won the war, yet also blamed for catastrophic losses at the Somme (420,000 British casualties). He remains the most controversial British commander of the 20th century.',
    source: 'Sheffield, The Chief (2011)',
    type: 'deploy',
  },
  'general-haig-death': {
    headline: 'LIONS LED BY DONKEYS?',
    body: 'The phrase "lions led by donkeys" — brave soldiers commanded by incompetent generals — has been disputed by historians. Many argue Haig\'s army learned from its failures and developed the combined-arms tactics that defeated Germany in 1918. History rarely offers clean verdicts.',
    type: 'death',
  },
  'mark-i-tank-deploy': {
    headline: 'THE TANK: BORN IN SECRET',
    body: 'The Mark I tank was developed under the cover name "water carrier for Mesopotamia" to mislead spies — shortened to "tank." It debuted at Flers-Courcelette on 15 September 1916. Of 49 sent forward, only 32 reached the start line; 9 broke down immediately. Still, they caused panic in German lines.',
    source: 'Harris, Men, Ideas and Tanks (1995)',
    type: 'deploy',
  },
  'mark-i-tank-death': {
    headline: 'FLAWED PIONEER',
    body: 'Early tanks were unreliable nightmares. The Mark I had a breakdown rate of over 40%, steering required two men, maximum speed was 6 km/h, and the interior temperature reached 50°C. Crews suffered from exhaust fumes, deafening noise, and shell splinters that pierced the weak armour.',
    type: 'death',
  },
  'landser-deploy': {
    headline: 'THE GERMAN SOLDIER OF WWI',
    body: 'Germany mobilised 13.2 million men during WWI, more than any other belligerent. German infantry were generally considered superbly trained and equipped. The Stosstrupp (stormtrooper) tactics developed from 1915 onward revolutionised infantry warfare and influenced all modern armies.',
    type: 'deploy',
  },
  'sniper-deploy': {
    headline: 'THE INVISIBLE KILLER',
    body: 'WWI was the first industrialised use of snipers. German snipers, many recruited from hunters, caused enormous casualties in the trenches. The British response was to train their own snipers using telescopic sights — a technology German industry had led since the 1800s.',
    type: 'deploy',
  },
  'stormtrooper-deploy': {
    headline: 'STORMTROOPERS: FUTURE OF WAR',
    body: 'The Sturmtruppen were Germany\'s answer to trench deadlock. Instead of mass frontal attacks, small squads would infiltrate enemy lines, bypass strongpoints, and attack headquarters and artillery. These tactics, developed by Captain Willy Rohr, became the blueprint for modern infantry warfare.',
    type: 'deploy',
  },
  'poison-gas-deploy': {
    headline: 'CHEMISTRY AS A WEAPON',
    body: 'Fritz Haber, a German Jewish chemist, developed chlorine and mustard gas weapons for Germany. He called poison gas "a higher form of killing." His wife, chemist Clara Immerwahr, called it "a perversion of science" and took her own life in protest. Haber won the Nobel Prize in 1918 — for nitrogen fixation that feeds billions today.',
    source: 'Stoltzenberg, Fritz Haber (2004)',
    type: 'deploy',
  },
  'zeppelin-deploy': {
    headline: 'TERROR FROM THE SKY',
    body: 'Zeppelins first bombed London on 31 May 1915, killing 7 people. The psychological effect was enormous — civilians had never before been systematically targeted from the air. By the war\'s end, Zeppelin raids had killed 557 British civilians. They were eventually defeated by incendiary bullets that ignited the hydrogen.',
    type: 'deploy',
  },
  'howitzer-deploy': {
    headline: 'BIG BERTHA AND HER KIN',
    body: 'Germany\'s 420mm Krupp howitzers, nicknamed "Big Bertha," could fire a shell weighing 820 kg over 12 km. They demolished the Belgian forts at Liège in 1914 in days — forts that were considered impregnable. Heavy artillery completely changed the calculus of siege warfare.',
    type: 'deploy',
  },
  'kaiser-deploy': {
    headline: 'KAISER WILHELM II',
    body: 'Kaiser Wilhelm II was both erratic and bellicose. His "blank cheque" — unconditional support given to Austria-Hungary after Franz Ferdinand\'s assassination — made war almost inevitable. He ruled Germany until his abdication on 9 November 1918, two days before the armistice, living in exile in the Netherlands until 1941.',
    source: 'MacMillan, The War That Ended Peace (2013)',
    type: 'deploy',
  },
  'kaiser-death': {
    headline: 'THE END OF EMPERORS',
    body: 'WWI ended the rule of four empires: the German, Austro-Hungarian, Russian, and Ottoman. The abdication of their emperors (Wilhelm II, Karl I, Nicholas II, and Mehmed VI) reshaped the political map of the world. The age of empires was over.',
    type: 'death',
  },
  'a7v-tank-deploy': {
    headline: 'GERMANY\'S LONE TANK',
    body: 'Germany built only 20 A7V tanks during WWI, compared to Britain\'s 2,636 and France\'s 3,800. The A7V required a crew of 18, weighed 33 tonnes, and had a top speed of 8 km/h. The world\'s first tank-vs-tank battle occurred on 24 April 1918 near Villers-Bretonneux.',
    type: 'deploy',
  },

  // ─── OCTOBER REVOLUTION ────────────────────────────────────────────────────

  'scenario-october-revolution': {
    headline: 'BREAD, PEACE, LAND',
    body: 'In February 1917, starving Russian workers brought down Tsar Nicholas II. In October, Lenin\'s Bolsheviks seized power with the promise of "bread, peace, and land." But peace came at a devastating price: the Treaty of Brest-Litovsk surrendered a third of Russia\'s territory to Germany.',
    type: 'scenario',
  },
  'outcome-october-revolution': {
    headline: 'THE BIRTH OF THE USSR',
    body: 'By 1922, the Red Army had defeated 19 foreign interventionist forces and the White Guards. The Russian Civil War killed an estimated 7-12 million people — more than Russia lost in WWI. Lenin\'s Soviet Union became the world\'s first communist state, and would last until 1991.',
    type: 'outcome',
  },

  'red-guard-deploy': {
    headline: 'THE RED GUARDS',
    body: 'The Red Guards were workers\' militias formed spontaneously in 1917. Poorly trained but politically motivated, they seized the Winter Palace on the night of 25-26 October 1917 (Old Style calendar) with minimal resistance — the Provisional Government had simply run out of defenders.',
    type: 'deploy',
  },
  'commissar-deploy': {
    headline: 'POLITICAL COMMISSARS',
    body: 'Trotsky introduced political commissars to the Red Army in 1918 — party officials who sat alongside military commanders to ensure political loyalty. If a commander failed or showed suspect loyalty, the commissar could overrule or have him arrested. The system was later adopted (and vastly more brutally used) by Nazi Germany.',
    type: 'deploy',
  },
  'cheka-deploy': {
    headline: 'THE CHEKA: SWORD OF THE REVOLUTION',
    body: 'Founded by Felix Dzerzhinsky in December 1917, the Cheka was the Bolshevik secret police. Its slogan: "We represent neither war nor peace, but death." During the Red Terror of 1918-1919, the Cheka executed an estimated 10,000-15,000 people. It became the OGPU, NKVD, and finally the KGB.',
    source: 'Leggett, The Cheka (1981)',
    type: 'deploy',
  },
  'armored-train-deploy': {
    headline: 'TROTSKY\'S ARMOURED TRAIN',
    body: 'Leon Trotsky commanded the entire Russian Civil War from a 12-carriage armoured train, travelling 65,000 miles to crisis points across the vast country. The train carried a printing press, radio transmitter, field tribunal — and Trotsky himself, who organised, inspired, and when necessary, personally executed deserters.',
    source: 'Service, Trotsky (2009)',
    type: 'deploy',
  },
  'propaganda-deploy': {
    headline: 'THE BIRTH OF MODERN PROPAGANDA',
    body: 'The Bolsheviks were pioneers of modern political propaganda. "Agitprop trains" covered in revolutionary murals toured the countryside, showing films and distributing leaflets to a largely illiterate population. Lenin understood that winning hearts and minds required new media — and used every tool available.',
    type: 'deploy',
  },
  'red-cavalry-deploy': {
    headline: 'THE RED CAVALRY',
    body: 'The First Cavalry Army under Budyonny was a crucial Bolshevik force — in the vast open spaces of Russia, cavalry retained its usefulness far longer than in WWI\'s trenches. The brutal Cossack campaigns were immortalised in Isaac Babel\'s Red Cavalry (1926), a masterpiece of Soviet literature.',
    type: 'deploy',
  },
  'trotsky-deploy': {
    headline: 'LEON TROTSKY: ORGANISER OF VICTORY',
    body: 'Before 1917, Trotsky had no military experience whatsoever. Yet as People\'s Commissar for Military Affairs, he built the Red Army from 10,000 to 5 million men. He re-enlisted 50,000 Tsarist officers at gunpoint (holding their families as hostages) — a pragmatic brutality that won the civil war.',
    source: 'Service, Trotsky (2009)',
    type: 'deploy',
  },
  'trotsky-death': {
    headline: 'EXILE AND MURDER',
    body: 'After Lenin\'s death, Stalin outmanoeuvred Trotsky, expelled him from the party, and exiled him in 1929. Trotsky continued writing and organising opposition from abroad. On 20 August 1940, Stalin\'s agent Ramón Mercader murdered him in Mexico City with an ice axe.',
    type: 'death',
  },
  'lenin-deploy': {
    headline: 'VLADIMIR ILYICH ULYANOV — "LENIN"',
    body: 'Lenin was smuggled into Russia by Germany in April 1917 in a sealed train, believing he would destabilise the Russian war effort. It worked beyond Germany\'s wildest expectations. Lenin\'s April Theses — demanding immediate peace and land redistribution — galvanised the Bolsheviks and set the revolution in motion.',
    source: 'Service, Lenin (2000)',
    type: 'deploy',
  },
  'lenin-death': {
    headline: 'THE DEATH OF LENIN',
    body: 'Lenin died on 21 January 1924, aged 53, after a series of strokes. His body was embalmed and placed on public display in Red Square — where it remains today. His death triggered a power struggle that Stalin won by 1929. Whether Lenin\'s version of communism or Stalin\'s terror state were the same thing is one of history\'s great debates.',
    type: 'death',
  },
  'tsarist-officer-deploy': {
    headline: 'THE IMPERIAL OFFICER CLASS',
    body: 'The Imperial Russian Army\'s officer class was largely drawn from the nobility and faced a brutal choice in 1917: flee, fight for the Whites, or serve the Reds. Thousands did the latter — either out of Russian patriotism, self-preservation, or genuine conversion to the new order.',
    type: 'deploy',
  },
  'cossack-deploy': {
    headline: 'THE COSSACKS',
    body: 'The Cossacks — semi-autonomous warrior communities of the Russian steppes — were historically the Tsar\'s most loyal cavalry. During the Civil War, most fought for the Whites, and their suppression by the Bolsheviks was devastating: the "Decossackisation" policy of 1919-1920 killed an estimated 300,000-500,000 people.',
    type: 'deploy',
  },
  'interventionist-deploy': {
    headline: 'FOREIGN INTERVENTION',
    body: '14 foreign nations sent troops to Russia during the Civil War, including Britain, France, the USA, and Japan. Their stated aim was to keep Russia fighting Germany; their real aim was to strangle the Bolshevik revolution. They failed — and the intervention became a foundation stone of Soviet anti-Western paranoia for decades.',
    type: 'deploy',
  },
  'kolchak-deploy': {
    headline: 'ADMIRAL KOLCHAK: "SUPREME RULER"',
    body: 'Alexander Kolchak, a brilliant Arctic explorer and naval commander, became the Whites\' "Supreme Ruler" in 1918. He controlled Siberia and advanced within 200 miles of Moscow. His brutal suppression of peasant revolts alienated the population and cost him crucial support.',
    type: 'deploy',
  },
  'kolchak-death': {
    headline: 'KOLCHAK\'S EXECUTION',
    body: 'Betrayed by his Czech allies and captured by the Bolsheviks, Admiral Kolchak was shot on 7 February 1920. His body was pushed through a hole in the ice on the Ushakovka River. His death effectively ended organised White resistance in Siberia.',
    type: 'death',
  },
  'tsar-deploy': {
    headline: 'NICHOLAS II: THE LAST TSAR',
    body: 'Nicholas II was Emperor of Russia from 1894 until his abdication on 2 March 1917. His reign was marked by military disasters (Russo-Japanese War, WWI), political inflexibility, and the malign influence of Rasputin. He abdicated hoping his brother would take the throne; instead, he was placed under arrest.',
    source: 'Massie, Nicholas and Alexandra (1967)',
    type: 'deploy',
  },
  'tsar-death': {
    headline: 'THE ROMANOVS\' LAST NIGHT',
    body: 'On the night of 16-17 July 1918, Tsar Nicholas II, his wife Alexandra, their five children, the family doctor, and three servants were shot in the basement of Ipatiev House in Yekaterinburg on Lenin\'s orders. The execution of a reigning monarch\'s entire family shocked the world and removed any possibility of Romanov restoration.',
    type: 'death',
  },

  // ─── VERSAILLES & ITS DISCONTENTS ──────────────────────────────────────────

  'scenario-versailles-discontents': {
    headline: 'THE PEACE THAT WAS NO PEACE',
    body: 'The Treaty of Versailles (28 June 1919) forced Germany to accept sole responsibility for WWI, pay 132 billion gold marks in reparations, and surrender 13% of its territory. Marshal Foch of France prophetically said: "This is not a peace. It is an armistice for twenty years." He was right to within one month.',
    source: 'MacMillan, Paris 1919 (2001)',
    type: 'scenario',
  },
  'outcome-versailles-discontents': {
    headline: 'THE ROAD TO WORLD WAR II',
    body: 'By September 1939, every safeguard of the Versailles order had been dismantled. Germany had rearmed, remilitarised the Rhineland, annexed Austria (Anschluss), absorbed the Sudetenland, and occupied the rest of Czechoslovakia. Appeasement had failed. The question was not if war would come — only when.',
    type: 'outcome',
  },

  'league-soldier-deploy': {
    headline: 'THE LEAGUE OF NATIONS',
    body: 'The League of Nations, Woodrow Wilson\'s great dream, was formed in 1920. Ironically, the US Senate refused to join it. The League condemned Japanese aggression in Manchuria (1931) and Italian invasion of Ethiopia (1935) — but had no army to enforce its decisions. It was dissolved in 1946.',
    type: 'deploy',
  },
  'churchill-deploy': {
    headline: 'WINSTON CHURCHILL IN THE WILDERNESS',
    body: 'During the 1930s, Churchill was a political outcast, repeatedly warning Parliament about Hitler\'s rearmament — warnings that were mocked or ignored. His famous dictum: "You were given the choice between war and dishonour. You chose dishonour, and you will have war." He became Prime Minister in May 1940 when the disaster he predicted arrived.',
    source: 'Jenkins, Churchill (2001)',
    type: 'deploy',
  },
  'churchill-death': {
    headline: 'BRITAIN\'S FINEST HOUR',
    body: '"We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets, we shall fight in the hills; we shall never surrender." — Winston Churchill, 4 June 1940. These words, broadcast to a nation staring at defeat, helped keep Britain in the war.',
    type: 'death',
  },
  'versailles-treaty-deploy': {
    headline: 'THE DIKTAT',
    body: 'Germans called Versailles the "Diktat" — dictated peace — because they were not allowed to negotiate. Article 231, the "War Guilt" clause, assigned sole responsibility for the war to Germany. German politicians used the treaty as a source of grievance throughout the Weimar Republic. Hitler exploited it masterfully.',
    type: 'deploy',
  },
  'poilu-deploy': {
    headline: 'THE FRENCH POILU',
    body: 'France lost 1.4 million soldiers killed in WWI — 27% of all men aged 18-27. The psychological scar was so deep that France\'s military doctrine in the 1930s was purely defensive. "No more Verduns" led directly to the Maginot Line, and to the refusal to believe that another war was coming.',
    type: 'deploy',
  },
  'maginot-deploy': {
    headline: 'THE MAGINOT LINE',
    body: 'France spent 3 billion francs building the Maginot Line (1929-1936) — a 700km series of underground fortifications along the German border. It was technically brilliant and completely bypassed: Germany invaded through Belgium and the Ardennes, where the French had not extended the Line. France fell in 46 days.',
    source: 'Kemp, The Maginot Line (1981)',
    type: 'deploy',
  },
  'appeasement-deploy': {
    headline: 'THE PRICE OF PEACE',
    body: 'At Munich on 30 September 1938, Britain and France agreed to let Hitler annex the Sudetenland from Czechoslovakia. Neville Chamberlain returned to London declaring "peace for our time." Hitler privately called him a "little worm." Six months later, Germany occupied all of Czechoslovakia.',
    source: 'Taylor, The Origins of the Second World War (1961)',
    type: 'deploy',
  },
  'blackshirt-deploy': {
    headline: 'THE BIRTH OF FASCISM',
    body: 'Benito Mussolini coined the term "fascism" from "fasces" — the Roman symbol of state power. His Blackshirts terrorised political opponents, destroying trade unions and left-wing parties. His "March on Rome" in October 1922 — a bluff the King chose not to call — made him Prime Minister at 39.',
    type: 'deploy',
  },
  'ss-deploy': {
    headline: 'THE SS: HIMMLER\'S EMPIRE',
    body: 'Originally Hitler\'s personal bodyguard, the SS (Schutzstaffel) under Heinrich Himmler grew into a state within a state. At its peak, it had nearly a million members. The SS ran the concentration camp system, the Gestapo, and fielded its own military divisions. It was convicted as a criminal organisation at Nuremberg.',
    type: 'deploy',
  },
  'nazi-propaganda-deploy': {
    headline: 'GOEBBELS AND THE MACHINERY OF LIES',
    body: 'Joseph Goebbels, Nazi Reich Minister of Propaganda, controlled all German media from 1933. Radio ownership in Germany tripled during the Nazi period — deliberately, as it was the regime\'s most direct route to the people. Goebbels pioneered the "big lie" technique: a falsehood so colossal that no one would believe anyone could have made it up.',
    type: 'deploy',
  },
  'kondor-deploy': {
    headline: 'SPAIN: THE REHEARSAL',
    body: 'The Kondor Legion was a German military unit sent to support Franco in the Spanish Civil War (1936-1939). It tested Blitzkrieg tactics, the Messerschmitt Bf 109, and terror bombing. The bombing of Guernica on 26 April 1937 killed up to 300 civilians and inspired Picasso\'s famous painting. It was a preview of what was coming for all of Europe.',
    type: 'deploy',
  },
  'mussolini-deploy': {
    headline: 'IL DUCE',
    body: 'Mussolini initially looked down on Hitler as a crude imitator of his own fascism. By 1936, however, the two had formed the Rome-Berlin Axis. Mussolini\'s fateful decision to enter WWII in June 1940 — when he thought Germany had already won — would prove disastrous for Italy.',
    source: 'Bosworth, Mussolini (2002)',
    type: 'deploy',
  },
  'mussolini-death': {
    headline: 'THE END OF IL DUCE',
    body: 'On 28 April 1945, Mussolini was captured by Italian Communist partisans while attempting to flee to Switzerland disguised as a German soldier. He was shot without trial. His body was hung upside-down at a petrol station in Milan — the same spot where Fascists had murdered 15 partisans years before.',
    type: 'death',
  },
  'night-knives-deploy': {
    headline: 'THE NIGHT OF THE LONG KNIVES',
    body: 'On 30 June 1934, Hitler ordered the assassination of the SA\'s leadership under Ernst Röhm, along with dozens of other perceived enemies. Between 85 and 200 people were murdered over three days. Hitler later claimed he acted to prevent a coup. The purge eliminated his rivals and won him the army\'s loyalty.',
    source: 'Evans, The Third Reich in Power (2005)',
    type: 'deploy',
  },
  'hitler-deploy': {
    headline: 'ADOLF HITLER: THE ROAD TO POWER',
    body: 'Born in Austria in 1889, Hitler was a failed artist who fought in WWI as a corporal. Embittered by Germany\'s defeat, he joined a tiny nationalist party that he remade into the Nazi Party. His beer-hall putsch failed in 1923 and landed him in prison, where he wrote Mein Kampf — a book that sold 12 million copies by 1945.',
    source: 'Kershaw, Hitler 1889-1936: Hubris (1998)',
    type: 'deploy',
  },
  'hitler-death': {
    headline: 'THE FÜHRER\'S BUNKER',
    body: 'On 30 April 1945, as Soviet troops fought street by street above him, Adolf Hitler shot himself in his Berlin bunker. His body was burned in the Reich Chancellery garden. His 12-year "thousand-year Reich" had killed approximately 70-85 million people — 3% of the world\'s entire 1940 population.',
    source: 'Beevor, Berlin: The Downfall 1945 (2002)',
    type: 'death',
  },
  'roosevelt-deploy': {
    headline: 'FRANKLIN D. ROOSEVELT',
    body: 'FDR served an unprecedented four terms as US President (1933-1945). Disabled by polio from 1921, he led America through the Great Depression and WWII. His Lend-Lease Act (1941) effectively ended US neutrality, supplying Britain with $50 billion worth of arms before America formally entered the war.',
    type: 'deploy',
  },
  'panzer-i-deploy': {
    headline: 'REARMAMENT IN SECRET',
    body: 'The Versailles Treaty banned Germany from having tanks. Germany secretly developed armoured doctrine using cardboard mock-ups strapped to cars, and trained with Soviet Russia at Kazan from 1926-1933. When Hitler came to power, he openly tore up Versailles. The democracies watched and did nothing.',
    type: 'deploy',
  },

  // ─── FALL OF FRANCE ────────────────────────────────────────────────────────

  'scenario-fall-of-france': {
    headline: 'THE STRANGE DEFEAT',
    body: 'On 10 May 1940, Germany launched Fall Gelb (Case Yellow). Instead of the expected attack through Belgium, the main thrust came through the Ardennes — terrain the French considered impassable for armour. The result was the most spectacular military collapse in modern history.',
    source: 'Bloch, Strange Defeat (1940)',
    type: 'scenario',
  },
  'outcome-fall-of-france': {
    headline: 'FRANCE ARMISTICE',
    body: 'France signed an armistice on 22 June 1940, just 46 days after the German invasion began. Hitler insisted it be signed in the same railway carriage where Germany had signed the 1918 armistice. Occupied France was divided: the German zone in the north, and "Vichy France" — a collaborationist regime — in the south.',
    type: 'outcome',
  },

  'char-b1-deploy': {
    headline: 'FRANCE\'S SUPERIOR TANKS',
    body: 'France had more and better tanks than Germany in 1940. The Char B1 had armour that German anti-tank guns could not penetrate. But French tanks were used dispersed in infantry support, not concentrated in armoured divisions like Germany\'s Panzers. A technical superiority was made irrelevant by doctrinal failure.',
    source: 'Doughty, The Seeds of Disaster (1985)',
    type: 'deploy',
  },
  'spitfire-deploy': {
    headline: 'THE SPITFIRE',
    body: 'Designed by R.J. Mitchell, the Supermarine Spitfire first flew in 1936. Its Rolls-Royce Merlin engine and elliptical wings made it one of the finest fighters ever built. During the Battle of Britain (July-September 1940), Spitfires and Hurricanes denied the Luftwaffe air superiority — a prerequisite for any German invasion.',
    type: 'deploy',
  },
  'dunkirk-deploy': {
    headline: 'THE MIRACLE OF DUNKIRK',
    body: 'Operation Dynamo (26 May - 4 June 1940) evacuated 338,226 Allied soldiers from Dunkirk\'s beaches using 800 boats — from destroyers to fishing smacks. Churchill called it "a miracle of deliverance." What he did not say publicly was that he had expected to save 45,000 men at most. The "little ships" saved an army.',
    source: 'Sebag-Montefiore, Dunkirk (2006)',
    type: 'deploy',
  },
  'de-gaulle-deploy': {
    headline: 'CHARLES DE GAULLE: LA FRANCE LIBRE',
    body: 'On 18 June 1940, Brigadier General de Gaulle made a radio broadcast from London: "Whatever happens, the flame of the French resistance must not and shall not die." Almost no one heard it. But it became the founding act of the Free French Forces, which would eventually return to liberate France.',
    source: 'Jackson, De Gaulle (2018)',
    type: 'deploy',
  },
  'resistance-deploy': {
    headline: 'THE FRENCH RESISTANCE',
    body: 'The French Resistance was initially tiny — perhaps 2% of the population actively resisted. But as German occupation grew harsher and conscripted labour began, resistance grew. By D-Day, over 100,000 were actively fighting. After liberation, many more claimed to have "always" been résistants.',
    type: 'deploy',
  },
  'stuka-deploy': {
    headline: 'THE STUKA\'S SCREAM',
    body: 'The Junkers Ju 87 was fitted with "Jericho trumpets" — wind-powered sirens that screamed as it dived. The psychological effect on troops who had never been bombed before was devastating. At Dunkirk, the Stuka became less effective when it met Spitfires for the first time, and its losses were catastrophic.',
    type: 'deploy',
  },
  'rommel-deploy': {
    headline: 'ROMMEL: THE GHOST DIVISION',
    body: 'Colonel Erwin Rommel\'s 7th Panzer Division advanced so fast during the French campaign that Rommel\'s own headquarters didn\'t know where it was. It became known as the "Ghost Division." Rommel sent 78,000 prisoners to the rear in just six weeks. His campaign diary later revealed that even his own troops struggled to keep up.',
    source: 'Rommel, The Rommel Papers (1953)',
    type: 'deploy',
  },
  'rommel-death': {
    headline: 'THE DESERT FOX\'S END',
    body: 'After the July 1944 plot against Hitler, Rommel was implicated despite having no prior knowledge. Given a choice between suicide (with a state funeral and his family\'s safety) and a public trial, Rommel took the poison on 14 October 1944. He was buried as a hero — the truth emerged only after the war.',
    type: 'death',
  },
  'ardennes-deploy': {
    headline: 'THE SICHELSCHNITT',
    body: 'The "sickle cut" — the plan to strike through the Ardennes — was considered too risky even by many German generals. General Erich von Manstein proposed it; Hitler adopted it after initially favouring a more conventional plan. The key insight: French commanders would never believe tanks could move through forest. They were right.',
    type: 'deploy',
  },

  // ─── OPERATION BARBAROSSA ──────────────────────────────────────────────────

  'scenario-operation-barbarossa': {
    headline: 'THE GREATEST INVASION IN HISTORY',
    body: 'Operation Barbarossa, launched on 22 June 1941, deployed 3.8 million German and Axis troops across a 2,900 km front — the largest military operation in history. Stalin had received 84 warnings of the invasion from intelligence sources and dismissed them all. The Red Army was caught entirely by surprise.',
    source: 'Beevor, The Second World War (2012)',
    type: 'scenario',
  },
  'outcome-operation-barbarossa': {
    headline: 'THE TURNING POINT',
    body: 'Operation Barbarossa failed to achieve its objectives. Germany advanced 1,000 km but did not capture Moscow, Leningrad, or the Caucasus oil fields before winter. The Soviet counter-offensive in December 1941 — while Japan attacked Pearl Harbor — marked the moment Germany lost the strategic initiative forever.',
    type: 'outcome',
  },

  't34-deploy': {
    headline: 'THE T-34: SHOCK AND AWE',
    body: 'When German tankers first encountered the T-34 in July 1941, they were horrified. Their standard anti-tank guns could not penetrate its sloped armour, and its gun could destroy any German tank at combat range. General von Kleist called it "the finest tank in the world." Germany\'s tank programme was immediately redesigned in response.',
    source: 'Zaloga, T-34/76 Medium Tank 1941-45 (1994)',
    type: 'deploy',
  },
  'katyusha-deploy': {
    headline: '"STALIN\'S ORGAN"',
    body: 'The BM-13 Katyusha multiple rocket launcher could fire 16 rockets in 7-10 seconds, devastating an area of 400,000 m². German soldiers called it "Stalin\'s Organ" for its distinctive howling sound. The Soviets kept its existence secret for months — each launcher was fitted with a self-destruct to prevent capture.',
    type: 'deploy',
  },
  'penal-deploy': {
    headline: 'ORDER NO. 227: NOT ONE STEP BACK',
    body: 'Stalin\'s Order No. 227 (28 July 1942) created penal battalions (shtrafbats) — units of soldiers condemned for cowardice or desertion, sent to the most dangerous sections of the front. "Blocking units" behind the lines shot anyone who retreated without orders. An estimated 400,000 soldiers served in penal units.',
    type: 'deploy',
  },
  'zhukov-deploy': {
    headline: 'GEORGY ZHUKOV: THE MARSHAL OF VICTORY',
    body: 'Zhukov won every major battle he commanded: Moscow (1941), Stalingrad (1942-43), Kursk (1943), Bagration (1944), and Berlin (1945). He was the only general to receive the highest Soviet military decoration four times. Stalin both needed him and feared him — after the war, he was demoted and exiled to prevent a challenge to Stalin\'s power.',
    source: 'Roberts, Stalin\'s General (2012)',
    type: 'deploy',
  },
  'zhukov-death': {
    headline: 'HISTORY\'S VERDICT',
    body: 'Zhukov was rehabilitated after Stalin\'s death and died in 1974 as a national hero. His memoirs were censored by Soviet authorities to remove any hint that Stalin\'s orders had ever cost lives. The full truth of how he — and all Soviet commanders — operated under constant threat of arrest was only told after 1991.',
    type: 'death',
  },
  'stalin-deploy': {
    headline: 'JOSEPH STALIN',
    body: 'Stalin\'s 1937-38 purges killed or imprisoned three of five Soviet marshals, 13 of 15 army commanders, and 50 of 85 corps commanders. When Barbarossa began, the Red Army was headless. Yet Stalin\'s determination never to surrender, and his country\'s ability to absorb catastrophic losses, ultimately proved decisive.',
    source: 'Montefiore, Stalin: The Court of the Red Tsar (2003)',
    type: 'deploy',
  },
  'stalin-death': {
    headline: 'STALIN\'S LEGACY',
    body: 'Stalin died on 5 March 1953. His regime killed an estimated 6-20 million Soviet citizens through the Gulag, collectivisation famines, and purges — before the war began. He also led the country that destroyed Hitler\'s Germany, suffering 27 million military and civilian deaths in the process. He remains one of history\'s most contested figures.',
    type: 'death',
  },
  'tiger-i-deploy': {
    headline: 'THE TIGER: FEAR ABOVE ALL',
    body: '"Tigerphobie" — Tiger phobia — afflicted Allied tank crews throughout 1943-45. A Tiger\'s 88mm gun could destroy a Sherman at 2,000m; a Sherman\'s 75mm gun could not penetrate a Tiger\'s front armour at any range. Yet Germany built only 1,347 Tigers, compared to 57,000 Shermans and 84,000 T-34s. Quality vs. quantity: quantity won.',
    source: 'Zaloga, Tiger I Heavy Tank (1993)',
    type: 'deploy',
  },
  'guderian-deploy': {
    headline: 'HEINZ GUDERIAN: FATHER OF BLITZKRIEG',
    body: 'Guderian\'s 1937 book "Achtung Panzer!" laid out the theory of armoured warfare that became Blitzkrieg. His Panzer Group advanced 700 km in the first three weeks of Barbarossa, capturing 324,000 prisoners at Minsk alone. His insistence on pressing towards Moscow in autumn 1941 was overruled by Hitler — a decision many historians consider Germany\'s greatest strategic mistake.',
    type: 'deploy',
  },

  // ─── LIBERATION / D-DAY ────────────────────────────────────────────────────

  'scenario-liberation': {
    headline: 'THE LONGEST DAY',
    body: 'D-Day, 6 June 1944: 156,115 troops, 11,590 aircraft, and 6,939 ships. The greatest combined military operation in history. The Allies had rehearsed it for years, yet on Omaha Beach, 2,000 Americans died in a single morning against positions not included in intelligence reports.',
    source: 'Beevor, D-Day: The Battle for Normandy (2009)',
    type: 'scenario',
  },
  'outcome-liberation': {
    headline: 'THE LIBERATION OF EUROPE',
    body: 'Paris was liberated on 25 August 1944. Germany signed its unconditional surrender on 7-8 May 1945 — V-E Day. The war in Europe was over. Approximately 40 million Europeans had died, most of them civilians. The world that emerged — the UN, NATO, the European project — was built in conscious reaction to everything that had gone wrong since 1914.',
    type: 'outcome',
  },

  'gi-deploy': {
    headline: 'THE AMERICAN GI',
    body: 'America went from an army of 170,000 men in 1939 to 8.2 million by 1945. Most GIs had never left their home state; many had never seen the sea. Their morale, equipment, and logistical support were unparalleled — the US produced half of all the world\'s industrial output during the war.',
    type: 'deploy',
  },
  'para-101st-deploy': {
    headline: 'BAND OF BROTHERS',
    body: 'The 101st Airborne Division, the "Screaming Eagles," jumped into Normandy at midnight before the beach landings. Scattered by wind and anti-aircraft fire, many units landed miles from their objectives. Yet their presence behind German lines caused enormous confusion — and their capture of the exits behind Utah Beach helped make it the least costly landing.',
    source: 'Ambrose, Band of Brothers (1992)',
    type: 'deploy',
  },
  'sherman-deploy': {
    headline: 'THE RELIABLE SHERMAN',
    body: 'The M4 Sherman was not the best tank of WWII, but it was the most available. 49,234 were built. Allied crews knew it as "Ronson" (after the lighter — "lights first time, every time") because of its tendency to catch fire. But tanks are only part of combined-arms warfare; Allied air, artillery, and logistics often compensated for the Sherman\'s weaknesses.',
    type: 'deploy',
  },
  'p51-deploy': {
    headline: 'THE P-51 CHANGES THE WAR',
    body: 'Before the P-51 Mustang entered service in late 1943, Allied bombers flying deep into Germany suffered catastrophic losses — sometimes 25% per mission. The P-51 had the range to escort bombers to Berlin and back. It destroyed the Luftwaffe\'s ability to contest Allied air superiority, making D-Day possible.',
    type: 'deploy',
  },
  'b17-deploy': {
    headline: 'THE STRATEGIC BOMBING CAMPAIGN',
    body: 'The Allied strategic bombing campaign dropped 1.3 million tonnes of bombs on Germany. It killed 300,000-600,000 German civilians, destroyed 3.6 million homes, and disrupted 75% of German war production by 1944. Yet German war production actually increased until 1944, as Albert Speer\'s armaments ministry proved remarkably adaptable. The human cost remains deeply controversial.',
    source: 'Overy, The Bombing War (2013)',
    type: 'deploy',
  },
  'eisenhower-deploy': {
    headline: 'GENERAL EISENHOWER',
    body: 'Before D-Day, Eisenhower wrote a note accepting full responsibility for failure: "Our landings have failed to gain a satisfactory foothold... The troops, the air and the Navy did all that bravery and devotion to duty could do. If any blame or fault attaches to the attempt, it is mine alone." He was fortunate never to have to send it.',
    source: 'D\'Este, Eisenhower: A Soldier\'s Life (2002)',
    type: 'deploy',
  },
  'eisenhower-death': {
    headline: 'IKE\'S WARNING',
    body: 'Eisenhower became the 34th US President (1953-1961). His farewell address coined the term "military-industrial complex" — warning that the permanent alliance between the arms industry and the military posed a threat to democratic governance. It remains one of the most prescient political speeches of the 20th century.',
    type: 'death',
  },
  'v1-deploy': {
    headline: 'THE V-WEAPONS',
    body: 'Germany\'s V-1 flying bombs and V-2 rockets were the world\'s first cruise and ballistic missiles. Between June 1944 and March 1945, 9,500 V-1s and 1,400 V-2s hit Britain. They killed 8,938 people. A third of German armaments workers were diverted to produce them — resources that might have produced more tanks or aircraft instead.',
    source: 'Zaloga, V-1 Flying Bomb 1942-52 (2005)',
    type: 'deploy',
  },
  'panther-deploy': {
    headline: 'THE PANTHER: TOO LATE',
    body: 'Designed as a direct response to the T-34, the Panther was arguably the best medium tank of WWII. But it was rushed into production to meet Hitler\'s deadline for the Battle of Kursk in 1943, and suffered catastrophic mechanical failures. By the time it was reliable — late 1943 — Germany was on the defensive everywhere.',
    type: 'deploy',
  },
  'atlantic-wall-deploy': {
    headline: 'THE ATLANTIC WALL',
    body: 'Hitler\'s "Atlantic Wall" was supposed to be an impregnable barrier along 2,685 km of European coastline. In reality, it was incomplete, thinly manned, and fatally misread Allied intentions. Rommel, given command of its defences in late 1943, was horrified and correctly demanded reinforcement. He was overruled on where to place the Panzer reserves.',
    type: 'deploy',
  },
  'tiger-ii-deploy': {
    headline: 'THE KING TIGER',
    body: 'The Tiger II was the most powerful tank to see significant action in WWII. Its 88mm KwK 43 gun could knock out any Allied tank at ranges exceeding 2,500m. Yet Germany built only 489. Their weight (68.5 tonnes) destroyed every bridge they crossed, their fuel consumption was enormous, and Allied air power made concentration of any armour nearly impossible by 1944.',
    type: 'deploy',
  },
  'goliath-deploy': {
    headline: 'REMOTE-CONTROLLED WARFARE',
    body: 'The Goliath was a remote-controlled miniature tracked vehicle packed with 60-100 kg of explosives. Over 7,000 were built — one of Germany\'s more ingenious desperate measures. They were first used at Anzio and Normandy. However, the control cable was easily cut by wire clippers, and the thin armour was vulnerable to small arms fire.',
    type: 'deploy',
  },
  'higgins-deploy': {
    headline: 'BOATS THAT WON THE WAR',
    body: 'Dwight Eisenhower called Andrew Higgins "the man who won the war for us." His LCVP (Higgins Boat) landed troops on every Allied beach from North Africa to Normandy. 23,358 were built in New Orleans. Without a shallow-draft landing craft that could beach itself, D-Day — and the Pacific island-hopping campaign — would have been impossible.',
    type: 'deploy',
  },
  'fallschirmjager-deploy': {
    headline: 'THE GREEN DEVILS',
    body: 'German paratroopers earned the nickname "Green Devils" from Allied troops who faced them. After suffering 25% casualties in the airborne assault on Crete (1941), Hitler never authorised another major airborne operation. Germany\'s best paratroopers spent the rest of the war fighting as elite ground infantry — at Cassino, in Normandy, and in the Ardennes.',
    type: 'deploy',
  },

  // ─── GENERIC TOWER/TOWER-FALL FACTS ────────────────────────────────────────

  'tower-fall-generic': {
    headline: 'THE LINES ARE BROKEN',
    body: 'In the real wars of this era, breakthrough rarely came easily. When a defensive line broke, the psychological effect was often more powerful than the physical. Entire armies surrendered not because they were defeated, but because command collapsed and morale evaporated.',
    type: 'tower',
  },
  'king-tower-fall': {
    headline: 'THE CAPITAL FALLS',
    body: 'The fall of a capital city — Petrograd, Paris, Brussels, Warsaw — was a devastating psychological blow. Yet in WWI and WWII, nations fought on even after losing their capitals. The Soviet government moved from Moscow to Kuibyshev in October 1941. France fought on from North Africa. London was bombed for 57 consecutive nights.',
    type: 'tower',
  },
};

export const getFactById = (factId) => facts[factId] ?? null;

export const getScenarioFact = (scenarioId, type = 'scenario') =>
  facts[`${type}-${scenarioId}`] ?? null;
