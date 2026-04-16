

midi_to_note = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
rel_to_interval = ["1", "b2", "2", "b3", "3", "4", "#4", "5", "b6", "6", "b7", "7"]

# 关注度从小到大排序
rel_to_interval_priority = [
    "1",
    "5",
    "3",
    "b3",
    "7",
    "b7",
    "6",
    "b6",
    "2",
    "4",
    "#4",
    "b2",
]

    

rel_tonic_to_interval = ["1", "b9", "9", "m3", "M3", "11", "11#", "5", "b13", "13", "m7", "M7"]

attn_weight = [0, 1, 0, 1,1, 1,1, 0, 1,1,1,1]


class Chord:
    def __init__(self, root, tonic, chord):
        self.root = root # int midi 0~11
        self.tonic = tonic # int midi 0~11
        self.chord = chord # List[int] midi 0~11
        self.get_chord_name()

    def get_chord_name(self):
        rel_notes = [rel_to_interval[(note - self.root)%12] for note in self.chord]
        rel_notes = [rel_note for i, rel_note in enumerate(rel_notes) if attn_weight[i]]
        rel_notes.sort(key=lambda x: rel_to_interval_priority.index(x))
        rel_notes = [rel_note for rel_note in rel_notes if rel_to_interval_priority.index(rel_note)>=2]
      
        self.rel_notes = rel_notes
        self.rel_notes_last = rel_notes[-1]
        
        self.tonic_name = rel_tonic_to_interval[(self.tonic - self.root) % 12]
        self.root_name = midi_to_note[self.root]
        self.chord_name = self.root_name + " " + ' '.join(self.rel_notes) + " " + self.tonic_name
    
    def __str__(self):
        return self.chord_name
    
    def __repr__(self):
        return self.__str__()

