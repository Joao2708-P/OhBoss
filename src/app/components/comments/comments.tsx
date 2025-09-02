'use client'
import { useState } from "react"
import styles from './comments.module.css'

type CommentFormProps = {
	onSubmitted?: () => void;
}

export default function Comments({ onSubmitted }: CommentFormProps) {
	const [name, setName] = useState('');
	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const [content, setContent] = useState('');
	const [rating, setRating] = useState(5);
	const [submitting, setSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!content.trim()) {
			setErrorMessage('Escreva seu comentário.');
			return;
		}
		setErrorMessage('');
		setSubmitting(true);
		try {
			let finalAvatarUrl: string | undefined = undefined;
			if (avatarFile) {
				if (avatarFile.size > 5 * 1024 * 1024) {
					throw new Error('Imagem deve ter até 5MB');
				}
				const fd = new FormData();
				fd.append('file', avatarFile);
				const upRes = await fetch('/api/comments/upload-avatar', { method: 'POST', body: fd });
				if (!upRes.ok) {
					const data = await upRes.json().catch(() => ({}));
					throw new Error(data?.error || 'Falha ao enviar imagem');
				}
				const upData = await upRes.json();
				finalAvatarUrl = upData.publicUrl as string;
			}
			const res = await fetch('/api/comments', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: name.trim() || undefined,
					avatar_url: finalAvatarUrl,
					content: content.trim(),
					rating
				})
			});
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data?.error || 'Falha ao enviar comentário');
			}
			if (onSubmitted) onSubmitted();
			setName('');
			setAvatarFile(null);
			setContent('');
			setRating(5);
		} catch (err: unknown) {
			setErrorMessage(err instanceof Error ? err.message : 'Erro inesperado');
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<form onSubmit={handleSubmit} className={styles.commentsForm}>
			<div className={styles.field}>
				<label htmlFor="name" className="label">Nome (opcional)</label>
				<input
					id="name"
					type="text"
					placeholder="Seu nome"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="input"
				/>
			</div>

			<div className={styles.field}>
				<label htmlFor="avatar" className={styles.label}>Foto (opcional)</label>
				<input
					id="avatar"
					type="file"
					accept="image/*"
					onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
					className={styles.input}
				/>
			</div>

			<div className={styles.field}>
				<label htmlFor="rating" className={styles.label}>Nota</label>
				<select
					id="rating"
					value={rating}
					onChange={(e) => setRating(parseInt(e.target.value))}
					className="select"
				>
					<option value={5}>5 - Excelente</option>
					<option value={4}>4 - Muito bom</option>
					<option value={3}>3 - Bom</option>
					<option value={2}>2 - Regular</option>
					<option value={1}>1 - Ruim</option>
				</select>
			</div>

			<div className={styles.field}>
				<label htmlFor="content" className={styles.label}>Comentário</label>
				<textarea
					id="content"
					placeholder="Escreva aqui..."
					value={content}
					onChange={(e) => setContent(e.target.value)}
					rows={4}
					className="textarea"
				/>
			</div>

			{errorMessage && (
				<p className="errorMessage">{errorMessage}</p>
			)}

			<div className={styles.actions}>
				<button
					type="submit"
					disabled={submitting}
					className="submitButton"
				>
					{submitting ? 'Enviando...' : 'Enviar comentário'}
				</button>
			</div>
		</form>
	);
}